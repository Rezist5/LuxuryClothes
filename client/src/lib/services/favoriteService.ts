import api from '../api';
import { Product } from '../types';

export const favoriteService = {
  getFavorites: () => api.get<Product[]>('/favorites'),
  addToFavorites: (productId: number) => 
    api.post(`/products/${productId}/favorite`),
  removeFromFavorites: (productId: number) => 
    api.delete(`/products/${productId}/favorite`)
}; 