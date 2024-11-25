import api from '../api';
import { CartItem } from '../types';

export const cartService = {
    getCart: () => api.get<CartItem[]>('/cart'),
    addToCart: (productId: number, quantity: number) => 
        api.post('/cart', { product_id: productId, quantity }),
    removeFromCart: (cartItemId: number) => 
        api.delete(`/cart/${cartItemId}`)
}; 