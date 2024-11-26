'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchProducts } from '@/lib/api'
import ProductCard from '@/components/products/ProductCard'
import ProductFilters from '@/components/products/ProductFilters'
import { Input } from "@/components/ui/input"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    gender: '',
    condition: '',
    size: '',
    minPrice: '',
    maxPrice: '',
    sort: 'latest',
    search: ''
  })

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setTimeout(() => {
      setFilters(prev => ({ ...prev, search: value }))
    }, 300)
  }

  const { data, isLoading } = useQuery(
    ['products', filters],
    () => fetchProducts(filters)
  )

  const products = data?.data || []
  const totalPages = data?.last_page || 1
  const currentPage = data?.current_page || 1

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 max-w-2xl mx-auto">
        <Input
          type="search"
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <ProductFilters filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="flex-1">
          {isLoading ? (
            <div className="text-center">Загрузка...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500">
              Товары не найдены
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

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