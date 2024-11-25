'use client';

import { useEffect, useState } from 'react';
import { Product, Category, AuthResponse } from '@/lib/types';
import api from '@/lib/api';

export const ApiTest = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [testResults, setTestResults] = useState<{[key: string]: any}>({});

    // Тест авторизации
    const testAuth = async () => {
        try {
            // Регистрация
            const registerResponse = await api.post('/register', {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                password_confirmation: 'password123'
            });
            setTestResults(prev => ({ ...prev, register: registerResponse.data }));

            // Логин
            const loginResponse = await api.post('/login', {
                email: 'test@example.com',
                password: 'password123'
            });
            setTestResults(prev => ({ ...prev, login: loginResponse.data }));

        } catch (err: any) {
            console.error('Auth Error:', err);
            setTestResults(prev => ({ 
                ...prev, 
                authError: err.response?.data?.message || err.message 
            }));
        }
    };

    // Тест получения продуктов и категорий
    const testProducts = async () => {
        try {
            // Получение категорий
            const categoriesResponse = await api.get<Category[]>('/categories');
            setTestResults(prev => ({ ...prev, categories: categoriesResponse.data }));

            // Получение продуктов
            const productsResponse = await api.get<Product[]>('/products');
            setTestResults(prev => ({ ...prev, products: productsResponse.data }));

        } catch (err: any) {
            console.error('Products Error:', err);
            setTestResults(prev => ({ 
                ...prev, 
                productsError: err.response?.data?.message || err.message 
            }));
        }
    };

    useEffect(() => {
        const runTests = async () => {
            setLoading(true);
            try {
                await testProducts();
                // Раскомментируйте, если хотите протестировать авторизацию
                // await testAuth();
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

            {Object.entries(testResults).map(([test, result]) => (
                <div key={test} className="border p-4 rounded mb-4">
                    <h2 className="font-bold mb-2">{test}</h2>
                    <pre className="bg-gray-100 p-2 rounded overflow-auto">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            ))}
        </div>
    );
}; 