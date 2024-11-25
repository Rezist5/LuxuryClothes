'use client';

import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'next/navigation'
import { fetchCategoryProducts } from '@/lib/api'
import ProductCard from '@/components/products/ProductCard'
import ProductFilters from '@/components/products/ProductFilters'

const genderLabels = {
  male: 'Мужская одежда',
  female: 'Женская одежда',
  unisex: 'Унисекс'
}

export default function CategoryPage() {
  const params = useParams()
  const [filters, setFilters] = useState({
    gender: '',
    condition: '',
    size: '',
    minPrice: '',
    maxPrice: '',
    sort: 'latest'
  })

  const { data, isLoading } = useQuery(
    ['categoryProducts', params.slug, filters],
    () => fetchCategoryProducts(params.slug as string, filters)
  )

  const category = data?.category
  const products = data?.products?.data || []
  const totalPages = data?.products?.last_page || 1
  const currentPage = data?.products?.current_page || 1

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Заголовок категории */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{category?.name}</h1>
        {category?.gender && (
          <p className="text-gray-600 mt-1">
            {genderLabels[category.gender as keyof typeof genderLabels]}
          </p>
        )}
      </div>

      <div className="flex gap-8">
        {/* Фильтры */}
        <div className="w-64 flex-shrink-0">
          <ProductFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Список продуктов */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1 
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 