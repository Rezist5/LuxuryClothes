import api from '../api';
import { Category } from '../types';

export const categoryService = {
    getAll: () => api.get<Category[]>('/categories'),
    getById: (id: number) => api.get<Category>(`/categories/${id}`),
    getBySlug: (slug: string) => api.get<Category>(`/categories/${slug}`)
}; 