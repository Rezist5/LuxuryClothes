'use client'

import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  seller?: {
    name: string
  }
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Товары не найдены</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="group"
        >
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            <p className="text-lg font-medium text-gray-900">
              {formatPrice(product.price)}
            </p>
            {product.seller && (
              <p className="text-sm text-gray-500">
                Продавец: {product.seller.name}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
} 