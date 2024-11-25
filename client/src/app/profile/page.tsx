'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchUser, fetchUserSales, fetchUserPurchases, updateProfile } from '@/lib/api'
import { formatPrice, formatDate } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import PasswordResetModal from '@/components/auth/PasswordResetModal'

interface User {
  id: string
  name: string
  email: string
  username: string
  avatar_url?: string
  phone?: string
  city?: string
  country?: string
  role: string
  created_at: string
}

interface Product {
  id: string
  name: string
  price: number
  images: string[]
}

interface OrderItem {
  id: number
  product: Product
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

interface Sale {
  id: string
  name: string
  price: number
  images: string[]
  orderItems: {
    order: Order
    quantity: number
    price: number
    created_at: string
  }[]
}

type TabType = 'profile' | 'purchases' | 'sales'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>({})
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  
  const queryClient = useQueryClient()
  const { data: user } = useQuery('user', fetchUser)
  const { data: sales } = useQuery('sales', fetchUserSales)
  const { data: purchases } = useQuery('purchases', fetchUserPurchases)

  const updateProfileMutation = useMutation(
    async (data: FormData) => {
      await updateProfile(data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        setIsEditing(false)
        toast.success('Профиль успешно обновлен')
      },
      onError: () => {
        toast.error('Ошибка при обновлении профиля')
      }
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formDataToSend = new FormData()
    
    if (formData.name) formDataToSend.append('name', formData.name)
    if (formData.phone) formDataToSend.append('phone', formData.phone)
    if (formData.address) formDataToSend.append('address', formData.address)
    if (avatarFile) formDataToSend.append('avatar', avatarFile)

    await updateProfileMutation.mutateAsync(formDataToSend)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatarFile(e.target.files[0])
    }
  }

  const renderProfile = () => (
    <div className="bg-gray-800 rounded-lg p-8">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-input"
              />
              <label htmlFor="avatar-input" className="cursor-pointer">
                {avatarFile ? (
                  <img
                    src={URL.createObjectURL(avatarFile)}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-3xl text-white">{user?.name?.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute bottom-0 right-0 bg-black text-white p-1 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </label>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Имя</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Имя пользователя</label>
                <input
                  type="text"
                  defaultValue={user?.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white opacity-50"
                />
                <p className="mt-1 text-sm text-gray-400">Email нельзя изменить</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Телефон</label>
                <input
                  type="tel"
                  defaultValue={user?.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Город</label>
                <input
                  type="text"
                  defaultValue={user?.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Страна</label>
                <input
                  type="text"
                  defaultValue={user?.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100"
            >
              Сохранить
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-3xl text-white">{user?.name?.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                  <p className="text-gray-300">@{user?.username}</p>
                  <p className="text-gray-300">{user?.email}</p>
                  {user?.phone && <p className="text-gray-300">Телефон: {user.phone}</p>}
                  {user?.city && <p className="text-gray-300">Город: {user.city}</p>}
                  {user?.country && <p className="text-gray-300">Страна: {user.country}</p>}
                  <p className="text-gray-300">Роль: {user?.role}</p>
                  <p className="text-gray-300">Дата регистрации: {formatDate(user?.created_at)}</p>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-300 hover:text-white block"
                  >
                    Редактировать профиль
                  </button>
                  <button
                    onClick={() => setIsResetModalOpen(true)}
                    className="text-gray-300 hover:text-white block"
                  >
                    Изменить пароль
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white">Товары</h3>
              <p className="text-2xl font-bold text-white">{user?.products?.length || 0}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white">Продажи</h3>
              <p className="text-2xl font-bold text-white">{sales?.length || 0}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white">Покупки</h3>
              <p className="text-2xl font-bold text-white">{purchases?.length || 0}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderSales = () => (
    <div className="space-y-4">
      {sales?.map((sale) => (
        <div key={sale.id} className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <img
              src={sale.images[0]}
              alt={sale.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium text-white">{sale.name}</h4>
              <p className="text-gray-300">{formatPrice(sale.price)}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {sale.orderItems.map((item, index) => (
              <div key={index} className="text-sm text-gray-300">
                Продано: {item.quantity} шт. × {formatPrice(item.price)} ({formatDate(item.created_at)})
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderPurchases = () => (
    <div className="space-y-4">
      {purchases?.map((order) => (
        <div key={order.id} className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-white">Заказ #{order.id}</h3>
              <p className="text-sm text-gray-300">
                {formatDate(order.created_at)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-white">
                {formatPrice(order.total_amount)}
              </p>
              <p className="text-sm text-gray-300">
                Статус: {order.status}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">{item.product.name}</h4>
                  <p className="text-sm text-gray-300">
                    {item.quantity} шт. × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-medium text-white">
                  {formatPrice(item.subtotal)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'profile'
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          Профиль
        </button>
        <button
          onClick={() => setActiveTab('purchases')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'purchases'
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          Мои покупки
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'sales'
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          Мои продажи
        </button>
      </div>

      <div>
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'sales' && renderSales()}
        {activeTab === 'purchases' && renderPurchases()}
      </div>

      <PasswordResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  )
} 