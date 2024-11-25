'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { fetchProduct, addToCart } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  gender: 'male' | 'female' | 'unisex';
  condition: 'new' | 'used' | 'good';
  brand?: string;
  size: string;
  color: string;
  material?: string;
  style?: string;
  seller?: {
    name: string;
  };
}

const genderLabels = {
  male: 'Мужская',
  female: 'Женская',
  unisex: 'Унисекс'
}

const conditionLabels = {
  new: 'Новое',
  used: 'Б/У',
  good: 'Хорошее'
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  const { data: product, isLoading } = useQuery<Product>(
    ['product', params.id],
    () => fetchProduct(params.id as string)
  )

  const addToCartHandler = async () => {
    try {
      await addToCart(product?.id as string, quantity)
      alert('Товар добавлен в корзину')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Ошибка при добавлении в корзину')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Галерея изображений */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 w-full">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    selectedImage === image ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Информация о продукте */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <div className="mt-2">
                <Badge variant="secondary">
                  {genderLabels[product.gender || 'unisex']}
                </Badge>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Характеристики товара */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900">Характеристики</h3>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Бренд</span>
                  <p className="mt-1">{product.brand || 'Не указан'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Размер</span>
                  <p className="mt-1">{product.size}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Состояние</span>
                  <p className="mt-1">{conditionLabels[product.condition]}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Цвет</span>
                  <p className="mt-1">{product.color}</p>
                </div>
                {product.material && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Материал</span>
                    <p className="mt-1">{product.material}</p>
                  </div>
                )}
                {product.style && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Стиль</span>
                    <p className="mt-1">{product.style}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Описание */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900">Описание</h3>
            <div className="mt-4 prose prose-sm text-gray-500">
              {product.description}
            </div>
          </div>

          {/* Информация о продавце */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Продавец</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.seller?.name || 'Неизвестный продавец'}
                </p>
              </div>
              <button className="text-sm font-medium text-black hover:text-gray-700">
                Написать продавцу
              </button>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="mt-8 flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={addToCartHandler}
                className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Добавить в корзину
              </button>
            </div>
            <button className="w-full border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              В избранное
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 