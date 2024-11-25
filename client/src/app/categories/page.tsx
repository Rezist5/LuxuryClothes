'use client'

import { useQuery } from 'react-query'
import { fetchCategories } from '@/lib/api'
import Link from 'next/link'
import type { Category } from '@/types/category'

export default function CategoriesPage() {
  const { data: categories, isLoading } = useQuery<Category[]>('categories', fetchCategories)

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Все категории</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group block"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                  <div className="text-center">
                    <h3 className="text-xl font-medium text-gray-900">{category.name}</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {category.products_count || 0} товаров
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {category.products_count || 0} {getProductsLabel(category.products_count || 0)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {category.description || 'Стильная одежда и аксессуары'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Функция для правильного склонения слова "товар"
function getProductsLabel(count: number): string {
  if (count === 1) return 'товар';
  if (count > 1 && count < 5) return 'товара';
  return 'товаров';
}