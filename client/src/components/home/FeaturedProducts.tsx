'use client'

import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { fetchProducts } from '@/lib/api'
import ProductCard from '@/components/products/ProductCard'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { Product } from '@/types/product'

export default function FeaturedProducts() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const itemsPerSlide = 4

  const { data: products, isLoading } = useQuery<Product[]>(
    'featuredProducts',
    () => fetchProducts({ sort: 'popular', limit: 12 })
  )

  const totalSlides = products ? Math.ceil(products.length / itemsPerSlide) : 0

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  // Автоматическая прокрутка каждые 5 секунд
  useEffect(() => {
    if (totalSlides <= 1) return

    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [totalSlides])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!products?.length) {
    return null
  }

  const currentProducts = products.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  )

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Items</h2>
        
        <div className="relative">
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-black' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 