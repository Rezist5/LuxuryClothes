'use client'

import { useQuery } from 'react-query'
import ProductCard from './ProductCard'
import { fetchProducts } from '@/lib/api'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  description: string
  gender: 'male' | 'female' | 'unisex'
  condition: 'new' | 'used' | 'good'
  brand?: string
  size: string
  color: string
  material?: string
  style?: string
  seller?: {
    name: string
  }
}

export default function FeaturedProducts() {
  const { data, error, isLoading } = useQuery<{ data: Product[] }>(
    'featuredProducts',
    () => fetchProducts({ sort: 'popular', limit: '4' })
  )

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg"></div>
              <div className="mt-4 space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    console.error('Error loading featured products:', error)
    return null
  }

  if (!data?.data?.length) {
    return null
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Популярные товары</h2>
        <a href="/products" className="text-gray-600 hover:text-gray-900">
          Смотреть все →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}