'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchOrder } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import PaymentProofUpload from '@/components/orders/PaymentProofUpload'
import DeliveryConfirmation from '@/components/orders/DeliveryConfirmation'

const statusLabels = {
  pending: 'В обработке',
  processing: 'Обрабатывается',
  completed: 'Завершен',
  cancelled: 'Отменен'
}

const paymentStatusLabels = {
  pending: 'Ожидает оплаты',
  paid: 'Оплачен',
  failed: 'Ошибка оплаты'
}

const deliveryStatusLabels = {
  pending: 'Ожидает отправки',
  shipping: 'В пути',
  delivered: 'Доставлен'
}

export default function OrderPage() {
  const params = useParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const loadOrder = async () => {
    try {
      const data = await fetchOrder(params.id as string)
      setOrder(data)
    } catch (error) {
      console.error('Failed to load order:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrder()
  }, [params.id])

  if (loading) return <div>Загрузка...</div>
  if (!order) return <div>Заказ не найден</div>

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">Заказ #{order.id}</h1>
              <p className="text-sm text-gray-500">
                Создан: {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <Badge>
              {statusLabels[order.status as keyof typeof statusLabels]}
            </Badge>
          </div>

          <div className="mt-6 space-y-6">
            {/* Статус оплаты */}
            <div>
              <h3 className="text-lg font-medium">Статус оплаты</h3>
              <p className="mt-1">
                {paymentStatusLabels[order.payment_status as keyof typeof paymentStatusLabels]}
              </p>
              {order.payment_status === 'pending' && (
                <PaymentProofUpload 
                  orderId={order.id} 
                  onSuccess={loadOrder}
                />
              )}
            </div>

            {/* Статус доставки */}
            <div>
              <h3 className="text-lg font-medium">Статус доставки</h3>
              <p className="mt-1">
                {deliveryStatusLabels[order.delivery_status as keyof typeof deliveryStatusLabels]}
              </p>
              {order.delivery_status === 'shipping' && (
                <DeliveryConfirmation 
                  orderId={order.id}
                  onSuccess={loadOrder}
                />
              )}
            </div>

            {/* Адрес доставки */}
            <div>
              <h3 className="text-lg font-medium">Адрес доставки</h3>
              <p className="mt-1">{order.delivery_address}</p>
            </div>

            {/* Товары */}
            <div>
              <h3 className="text-lg font-medium mb-4">Товары</h3>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">
                          Количество: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Итого */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Итого</span>
                <span>{formatPrice(order.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 