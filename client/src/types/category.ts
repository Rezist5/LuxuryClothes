export type CategoryGender = 'male' | 'female' | 'unisex';

export interface Category {
  id: number;
  name: string;
  slug: string;
  gender: CategoryGender;
  description: string | null;
  image_path: string | null;
  products_count: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryFilters {
  gender?: CategoryGender | 'all';
  hasProducts?: boolean;
  sortBy?: 'name' | 'products_count' | 'latest';
} 