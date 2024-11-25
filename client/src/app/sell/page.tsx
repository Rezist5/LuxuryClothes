'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct } from '@/lib/api'
import ProductForm from '@/components/products/ProductForm'
import { useQuery } from 'react-query'
import { fetchCategories } from '@/lib/api'

export default function SellPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: categories } = useQuery('categories', () => fetchCategories())

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError(null)

    try {
      await createProduct(formData)
      router.push('/')
      router.refresh()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при создании объявления')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Продать вещь</h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <ProductForm 
        onSubmit={handleSubmit}
        loading={loading}
        categories={categories || []}
      />
    </div>
  )
} 