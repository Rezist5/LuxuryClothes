'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { productService } from '@/lib/services/productService';

interface ProductListProps {
    categoryId?: number;
}

export const ProductList: React.FC<ProductListProps> = ({ categoryId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = categoryId 
                    ? await productService.getByCategory(categoryId)
                    : await productService.getAll();
                setProducts(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [categoryId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <div key={product.id} className="border p-4 rounded">
                    <h3 className="font-bold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="text-lg font-bold">${product.price}</p>
                </div>
            ))}
        </div>
    );
}; 