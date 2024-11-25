'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import ProductCard from './ProductCard'
import { fetchProducts } from '@/lib/api'

interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  condition: string
  brand: string
}

export default function FeaturedProducts() {
  const { data: products, error, isLoading } = useSWR<Product[]>('products', fetchProducts)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg"></div>
            <div className="mt-4 space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error loading products</div>
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Items</h2>
        <a href="/products" className="text-gray-600 hover:text-gray-900">
          View all →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}