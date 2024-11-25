import api from '../api';
import { Product } from '../types';

export const productService = {
    getAll: () => api.get<Product[]>('/products'),
    getById: (id: number) => api.get<Product>(`/products/${id}`),
    getByCategory: (categoryId: number) => api.get<Product[]>(`/products?category_id=${categoryId}`),
    getFeatured: () => api.get<Product[]>('/products?featured=1')
}; 