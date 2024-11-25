import api from '../api';
import { Review } from '../types';

export const reviewService = {
  createReview: (productId: number, data: { rating: number; comment: string }) => 
    api.post(`/products/${productId}/reviews`, data),
  updateReview: (reviewId: number, data: { rating: number; comment: string }) => 
    api.put(`/reviews/${reviewId}`, data),
  deleteReview: (reviewId: number) => 
    api.delete(`/reviews/${reviewId}`)
}; 