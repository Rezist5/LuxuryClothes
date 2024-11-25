'use client'

import { Button } from '@/components/ui/button'
import { confirmDelivery } from '@/lib/api'
import { toast } from 'react-hot-toast'

interface DeliveryConfirmationProps {
  orderId: number
  onSuccess: () => void
}

export default function DeliveryConfirmation({ orderId, onSuccess }: DeliveryConfirmationProps) {
  const handleConfirm = async () => {
    try {
      await confirmDelivery(orderId)
      toast.success('Получение подтверждено')
      onSuccess()
    } catch (error) {
      toast.error('Ошибка при подтверждении получения')
    }
  }

  return (
    <Button onClick={handleConfirm} className="mt-4">
      Подтвердить получение
    </Button>
  )
} 