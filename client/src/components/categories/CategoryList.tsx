'use client';

import Link from 'next/link';
import { useQuery } from 'react-query';
import { fetchCategories } from '@/lib/api';

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

export default function CategoryList() {
  const { data: categories, isLoading } = useQuery<Category[]>('categories', fetchCategories);

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <span className="text-gray-500">{category.name}</span>
              </div>
            )}
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
} 