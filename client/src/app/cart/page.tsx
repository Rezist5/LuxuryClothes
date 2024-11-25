'use client'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'
import { fetchCart, updateCartItem, removeFromCart, createOrder } from '@/lib/api'

interface CartItem {
  id: number
  product: {
    id: string
    name: string
    price: number
    images: string[]
  }
  quantity: number
}

export default function CartPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [deliveryAddress, setDeliveryAddress] = useState('')

  const { data: cartItems, isLoading } = useQuery<CartItem[]>('cart', fetchCart)

  const updateQuantityMutation = useMutation(
    async ({ id, quantity }: { id: number; quantity: number }) => {
      await updateCartItem(id, quantity)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart')
      }
    }
  )

  const removeItemMutation = useMutation(
    async (id: number) => {
      await removeFromCart(id)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart')
      }
    }
  )

  const createOrderHandler = async () => {
    if (!deliveryAddress.trim()) {
      alert('Пожалуйста, укажите адрес доставки')
      return
    }

    try {
      const order = await createOrder({
        delivery_address: deliveryAddress.trim()
      })
      
      queryClient.invalidateQueries('cart')
      
      router.push(`/orders/${order.id}`)
    } catch (error: any) {
      console.error('Error creating order:', error)
      alert(error.response?.data?.message || 'Ошибка при создании заказа')
    }
  }

  if (isLoading) return <div>Загрузка...</div>

  if (!cartItems?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
        <button
          onClick={() => router.push('/products')}
          className="text-blue-600 hover:text-blue-800"
        >
          Перейти к покупкам
        </button>
      </div>
    )
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8 text-white">Корзина</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border rounded-lg bg-gray-800"
          >
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-1">
              <h3 className="font-medium text-white">{item.product.name}</h3>
              <p className="text-gray-300">{formatPrice(item.product.price)}</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const quantity = parseInt(e.target.value)
                  if (quantity > 0) {
                    updateQuantityMutation.mutate({ id: item.id, quantity })
                  }
                }}
                className="w-20 px-2 py-1 border rounded"
              />
              
              <button
                onClick={() => removeItemMutation.mutate(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-700 pt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-medium text-white">Итого:</span>
          <span className="text-xl font-bold text-white">{formatPrice(total)}</span>
        </div>

        <div className="mb-4">
          <label htmlFor="delivery_address" className="block text-sm font-medium text-white mb-2">
            Адрес доставки
          </label>
          <textarea
            id="delivery_address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
            rows={3}
            required
          />
        </div>

        <button
          onClick={createOrderHandler}
          className="w-full bg-white text-black py-3 rounded-md hover:bg-gray-100"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  )
} 