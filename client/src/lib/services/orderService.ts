import api from '../api';
import { Order } from '../types';

export const orderService = {
  getOrders: () => api.get<Order[]>('/orders'),
  createOrder: (data: { items: Array<{ product_id: number; quantity: number }> }) => 
    api.post('/orders', data)
}; 