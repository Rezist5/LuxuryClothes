'use client'

import { useState } from 'react'
import { updateCartItem, removeFromCart } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'

interface CartItemProps {
  item: any
  onUpdate: () => void
}

export default function CartItem({ item, onUpdate }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return
    setLoading(true)
    try {
      await updateCartItem(item.id, newQuantity)
      setQuantity(newQuantity)
      onUpdate()
      toast.success('Количество обновлено')
    } catch (error) {
      toast.error('Ошибка при обновлении количества')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async () => {
    setLoading(true)
    try {
      await removeFromCart(item.id)
      onUpdate()
      toast.success('Товар удален из корзины')
    } catch (error) {
      toast.error('Ошибка при удалении товара')
    } finally {
      setLoading(false)
    }
  }

  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.product.name}</h3>
            <p className="ml-4">{formatPrice(item.product.price)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {item.product.brand}
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={loading || quantity <= 1}
              className="p-1 rounded hover:bg-gray-100"
            >
              -
            </button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className="w-16 text-center"
              disabled={loading}
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={loading}
              className="p-1 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <div className="flex">
            <Button
              variant="ghost"
              onClick={handleRemove}
              disabled={loading}
            >
              Удалить
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
} 