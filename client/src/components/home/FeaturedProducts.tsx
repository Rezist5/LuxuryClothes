'use client'

import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { fetchProducts } from '@/lib/api'
import ProductCard from '@/components/products/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
}

export default function FeaturedProducts() {
  const [currentPage, setCurrentPage] = useState(0)
  const productsPerPage = 4

  const { data, error, isLoading } = useQuery(
    'featuredProducts',
    () => fetchProducts({ sort: 'popular', limit: '12' })
  )

  const products = data?.data || []
  const totalPages = Math.ceil(products.length / productsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // Автоматическая прокрутка каждые 5 секунд
  useEffect(() => {
    if (totalPages <= 1) return

    const timer = setInterval(nextPage, 5000)
    return () => clearInterval(timer)
  }, [totalPages])

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error || !products.length) {
    return null
  }

  const currentProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  )

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Items</h2>
        <a href="/products" className="text-gray-600 hover:text-gray-900">
          View all →
        </a>
      </div>

      <div className="relative">
        {totalPages > 1 && (
          <>
            <button
              onClick={prevPage}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextPage}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentPage === index ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 