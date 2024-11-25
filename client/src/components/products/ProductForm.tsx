'use client'

import { useState, useRef } from 'react'
import { Category } from '@/types/category'
import ImageUpload from '@/components/common/ImageUpload'

interface ProductFormProps {
  onSubmit: (formData: FormData) => Promise<void>
  loading: boolean
  categories: Category[]
  initialData?: any
}

export default function ProductForm({ onSubmit, loading, categories, initialData }: ProductFormProps) {
  const [images, setImages] = useState<File[]>([])
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current || images.length === 0) return

    const formData = new FormData(formRef.current)
    
    // Удаляем старые изображения из FormData если они есть
    formData.delete('images')
    
    // Добавляем изображения в FormData
    images.forEach((image) => {
        formData.append('images[]', image)
    })

    await onSubmit(formData)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Основная информация */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Основная иформация</h2>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Название*
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={initialData?.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Описание*
            </label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={initialData?.description}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Категория*
            </label>
            <select
              name="category_id"
              required
              defaultValue={initialData?.category_id}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Цена (USD)*
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.price}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>
        </div>
      </div>

      {/* Характеристики */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Характеристики</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Бренд
            </label>
            <input
              type="text"
              name="brand"
              defaultValue={initialData?.brand}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Размер*
            </label>
            <select
              name="size"
              required
              defaultValue={initialData?.size}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              <option value="">Выберите размер</option>
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Состояние*
            </label>
            <select
              name="condition"
              required
              defaultValue={initialData?.condition}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              <option value="">Выберите состояние</option>
              <option value="new">Новое</option>
              <option value="like_new">Как новое</option>
              <option value="good">Хорошее</option>
              <option value="fair">Удовлетворительное</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Цвет*
            </label>
            <input
              type="text"
              name="color"
              required
              defaultValue={initialData?.color}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Материал
            </label>
            <input
              type="text"
              name="material"
              defaultValue={initialData?.material}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Стиль
            </label>
            <select
              name="style"
              defaultValue={initialData?.style}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              <option value="">Выберите стиль</option>
              <option value="casual">Повседневный</option>
              <option value="formal">Формальный</option>
              <option value="sport">Спортивный</option>
              <option value="vintage">Винтаж</option>
              <option value="streetwear">Стритвир</option>
              <option value="business">Деловой</option>
            </select>
          </div>
        </div>
      </div>

      {/* Загрузка изображений */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Фотографии*</h2>
        <ImageUpload
          images={images}
          onChange={setImages}
          maxImages={4}
        />
      </div>

      {/* Кнопка отправки */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Создание...' : 'Создать объявление'}
        </button>
      </div>
    </form>
  )
} 