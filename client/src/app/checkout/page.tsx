'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { fetchCart, createOrder } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const { data: cart, isLoading } = useQuery('cart', fetchCart)

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!cart?.items?.length) {
    router.push('/cart')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const order = await createOrder({
        delivery_address: address
      })

      toast.success('Заказ успешно создан')
      router.push(`/orders/${order.id}`)
    } catch (error) {
      console.error('Order creation error:', error)
      toast.error('Ошибка при создании заказа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Оформление заказа</h1>

      <div className="mt-12">
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {cart.items.map((item: any) => (
              <li key={item.id} className="py-6 flex">
                <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium">{item.product.name}</h3>
                    <p className="ml-4">{formatPrice(item.product.price)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Количество: {item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="mt-6">
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

          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Итого</p>
              <p>{formatPrice(cart.total)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Доставка и налоги включены
            </p>
          </div>

          <div className="mt-6">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Оформление...' : 'Подтвердить заказ'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 