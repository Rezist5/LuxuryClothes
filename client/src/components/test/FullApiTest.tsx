'use client';

import { useEffect, useState } from 'react';
import { Product, Category, AuthResponse } from '@/lib/types';
import api from '@/lib/api';

export const FullApiTest = () => {
    const [testResults, setTestResults] = useState<{[key: string]: any}>({});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const testAuth = async () => {
        try {
            // Тест регистрации
            const registerResponse = await api.post<AuthResponse>('/register', {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                password_confirmation: 'password123'
            });
            setTestResults(prev => ({ ...prev, register: registerResponse.data }));

            // Тест логина
            const loginResponse = await api.post<AuthResponse>('/login', {
                email: 'test@example.com',
                password: 'password123'
            });
            setTestResults(prev => ({ ...prev, login: loginResponse.data }));
        } catch (err: any) {
            setTestResults(prev => ({ 
                ...prev, 
                authError: err.response?.data?.message || err.message 
            }));
        }
    };

    const testProducts = async () => {
        try {
            // Тест получения продуктов
            const productsResponse = await api.get<Product[]>('/products');
            setTestResults(prev => ({ ...prev, products: productsResponse.data }));

            // Тест получения категорий
            const categoriesResponse = await api.get<Category[]>('/categories');
            setTestResults(prev => ({ ...prev, categories: categoriesResponse.data }));
        } catch (err: any) {
            setTestResults(prev => ({ 
                ...prev, 
                productsError: err.response?.data?.message || err.message 
            }));
        }
    };

    const testCart = async () => {
        try {
            // Тест добавления в корзину
            const addToCartResponse = await api.post('/cart', {
                product_id: 1,
                quantity: 1
            });
            setTestResults(prev => ({ ...prev, addToCart: addToCartResponse.data }));

            // Тест получения корзины
            const cartResponse = await api.get('/cart');
            setTestResults(prev => ({ ...prev, cart: cartResponse.data }));
        } catch (err: any) {
            setTestResults(prev => ({ 
                ...prev, 
                cartError: err.response?.data?.message || err.message 
            }));
        }
    };

    useEffect(() => {
        const runTests = async () => {
            setLoading(true);
            try {
                await testProducts();
                // Раскомментируйте для тестирования авторизации и корзины
                // await testAuth();
                // await testCart();
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        runTests();
    }, []);

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">API Test Results</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {Object.entries(testResults).map(([test, result]) => (
                    <div key={test} className="border p-4 rounded">
                        <h2 className="font-bold mb-2">{test}</h2>
                        <pre className="bg-gray-100 p-2 rounded overflow-auto">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
}; 