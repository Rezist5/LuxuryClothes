export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    sale_price?: number;
    stock: number;
    category_id: number;
    status: 'active' | 'inactive' | 'pending' | 'reserved';
    featured: boolean;
    view_count: number;
    category?: Category;
    images?: ProductImage[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image_path?: string;
}

export interface ProductImage {
    id: number;
    product_id: number;
    image_path: string;
    is_primary: boolean;
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    user_id: number;
}

export interface Profile {
    id: number;
    user: User;
    address?: string;
    phone?: string;
}

export interface SearchResults {
    products: Product[];
    categories: Category[];
}

export interface Order {
    id: number;
    user_id: number;
    total: number;
    status: string;
    items: CartItem[];
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: number;
    product_id: number;
    user_id: number;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface Dashboard {
    recent_orders: Order[];
    recent_users: User[];
    statistics: Statistics;
}

export interface Statistics {
    total_users: number;
    total_orders: number;
    total_revenue: number;
    daily_sales: number[];
}

export interface Report {
    period: string;
    data: any[]; // Определите конкретную структуру для разных типов отчетов
} 