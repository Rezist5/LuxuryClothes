'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createOrder } from '@/lib/api'
import { toast } from 'react-hot-toast'

interface CheckoutFormProps {
  productId: number
  price: number
  onSuccess: (orderId: number) => void
}

export default function CheckoutForm({ productId, price, onSuccess }: CheckoutFormProps) {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await createOrder({
        product_id: productId,
        delivery_address: address
      })

      toast.success('Заказ успешно создан')
      onSuccess(response.order.id)
    } catch (error) {
      console.error('Order creation error:', error)
      toast.error('Ошибка при создании заказа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Адрес доставки
        </label>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="Введите адрес доставки"
          className="mt-1"
        />
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span>Итого к оплате:</span>
          <span className="font-bold">${price}</span>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Оформление...' : 'Оформить заказ'}
        </Button>
      </div>
    </form>
  )
} 