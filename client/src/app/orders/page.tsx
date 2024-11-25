'use client'

import { useQuery } from 'react-query'
import { formatPrice } from '@/lib/utils'

interface OrderItem {
  id: number
  product: {
    name: string
    price: number
  }
  quantity: number
  price: number
  subtotal: number
}

interface Order {
  id: number
  total_amount: number
  status: string
  payment_status: string
  delivery_status: string
  created_at: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const { data: orders, isLoading } = useQuery<Order[]>('orders', async () => {
    const response = await fetch('/api/orders')
    if (!response.ok) throw new Error('Failed to fetch orders')
    return response.json()
  })

  if (isLoading) return <div>Загрузка...</div>

  if (!orders?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">У вас пока нет заказов</h1>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8 text-white">Мои заказы</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-6 bg-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium text-white">Заказ #{order.id}</h2>
                <p className="text-sm text-gray-300">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">{formatPrice(order.total_amount)}</p>
                <p className="text-sm text-gray-300">
                  Статус: {order.status}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-white">{item.product.name}</p>
                    <p className="text-sm text-gray-300">
                      {item.quantity} шт. × {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-medium text-white">{formatPrice(item.subtotal)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 