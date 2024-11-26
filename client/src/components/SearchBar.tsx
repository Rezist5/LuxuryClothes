'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { searchProducts } from '@/lib/api'
import { debounce } from 'lodash'
import Link from 'next/link'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = debounce(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    try {
      setIsLoading(true)
      const data = await searchProducts(searchQuery)
      setResults(data.products.data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }, 300)

  useEffect(() => {
    handleSearch(query)
  }, [query])

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Поиск товаров..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
      
      {query.length >= 2 && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 max-h-96 overflow-y-auto z-50">
          {results.map((product: any) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                {product.images?.[0] && (
                  <img 
                    src={product.images[0].url} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.price} ₽</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 p-4 text-center">
          Загрузка...
        </div>
      )}
    </div>
  )
} 