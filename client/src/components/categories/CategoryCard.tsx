import Link from 'next/link'
import type { Category } from '@/types/category'

type CategoryCardProps = {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="group block"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={category.image_path || `https://source.unsplash.com/640x480/?${category.slug}`}
          alt={category.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {category.products_count} товаров
        </p>
        {category.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  )
} 