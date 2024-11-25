import api from '../api';
import { Dashboard, User, Statistics, Report } from '../types';

export const adminService = {
  // Дашборд
  getDashboard: () => api.get<Dashboard>('/admin/dashboard'),
  
  // Управление пользователями
  getUsers: () => api.get<User[]>('/admin/users'),
  updateUserRole: (userId: number, role: string) => 
    api.put(`/admin/users/${userId}/role`, { role }),
  deleteUser: (userId: number) => 
    api.delete(`/admin/users/${userId}`),
  
  // Модерация товаров
  getPendingProducts: () => api.get('/admin/products/pending'),
  approveProduct: (productId: number) => 
    api.post(`/admin/products/${productId}/approve`),
  rejectProduct: (productId: number) => 
    api.post(`/admin/products/${productId}/reject`),
  deleteProduct: (productId: number) => 
    api.delete(`/admin/products/${productId}`),
  
  // Статистика
  getStatistics: () => api.get<Statistics>('/admin/statistics'),
  getSalesReport: () => api.get<Report>('/admin/reports/sales'),
  getUsersReport: () => api.get<Report>('/admin/reports/users')
}; 