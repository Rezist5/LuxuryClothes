import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProducts, fetchProduct } from '@/lib/api';
import type { Product, ProductFilters } from '@/types/product';

export function useProducts(filters?: ProductFilters) {
  return useQuery<Product[]>(
    ['products', filters],
    () => fetchProducts(filters),
    {
      staleTime: 1000 * 60 * 5, // 5 минут
    }
  );
}

export function useProduct(id: string) {
  return useQuery<Product>(
    ['product', id],
    () => fetchProduct(id),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 минут
    }
  );
}

export function useFeaturedProducts() {
  return useQuery<Product[]>(
    'featuredProducts',
    () => fetchProducts({ is_featured: true }),
    {
      staleTime: 1000 * 60 * 5, // 5 минут
    }
  );
}

export function useLatestProducts() {
  return useQuery<Product[]>(
    'latestProducts',
    () => fetchProducts({ sort: 'latest' }),
    {
      staleTime: 1000 * 60 * 5, // 5 минут
    }
  );
}

export function usePopularProducts() {
  return useQuery<Product[]>(
    'popularProducts',
    () => fetchProducts({ sort: 'popular' }),
    {
      staleTime: 1000 * 60 * 5, // 5 минут
    }
  );
} 