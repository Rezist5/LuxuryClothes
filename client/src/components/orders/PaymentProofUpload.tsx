'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { uploadPaymentProof } from '@/lib/api'
import { toast } from 'react-hot-toast'

interface PaymentProofUploadProps {
  orderId: number
  onSuccess: () => void
}

export default function PaymentProofUpload({ orderId, onSuccess }: PaymentProofUploadProps) {
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('payment_proof', file)

    try {
      await uploadPaymentProof(orderId, formData)
      toast.success('Подтверждение оплаты загружено')
      onSuccess()
    } catch (error) {
      toast.error('Ошибка при загрузке подтверждения')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={`payment-proof-${orderId}`}
      />
      <label 
        htmlFor={`payment-proof-${orderId}`} 
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {loading ? 'Загрузка...' : 'Загрузить подтверждение оплаты'}
      </label>
    </div>
  )
} 