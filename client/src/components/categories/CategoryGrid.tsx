'use client'

import { useQuery } from 'react-query'
import { fetchCategories } from '@/lib/api'
import Link from 'next/link'

interface Category {
  id: number
  name: string
  slug: string
  image_path: string
  products_count: number
}

export default function CategoryGrid() {
  const { data: categories, isLoading } = useQuery<Category[]>(
    ['popularCategories'],
    () => fetchCategories({ limit: 4, sort: 'popular' })
  )

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop By Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
              <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!categories?.length) {
    return null
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop By Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.slice(0, 4).map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.slug}`}
            className="group relative block"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={category.image_path || `https://source.unsplash.com/640x480/?${category.slug}`}
                alt={category.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-sm opacity-90">{category.products_count} items</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}