export type ProductStatus = 'active' | 'pending' | 'rejected' | 'sold';
export type ProductCondition = 'new' | 'like_new' | 'good' | 'fair';
export type ProductGender = 'men' | 'women' | 'unisex';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  category_id: number;
  seller_id: number;
  brand: string | null;
  size: string;
  condition: ProductCondition;
  color: string;
  material: string | null;
  style: string | null;
  gender: ProductGender | null;
  images: string[];
  is_featured: boolean;
  views_count: number;
  sold_at: string | null;
  created_at: string;
  updated_at: string;
  
  // Связанные данные
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  seller?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ProductFilters {
  category?: string;
  gender?: ProductGender;
  condition?: ProductCondition;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  style?: string;
  brand?: string;
} 