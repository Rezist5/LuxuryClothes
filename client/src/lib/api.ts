import axios from 'axios';

// В начале файла добавим проверку
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const BASE_URL = API_URL.replace('/api', '');

// Функция для получения CSRF токена
async function getCsrfToken() {
  await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
    withCredentials: true
  });
}

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

// Добавляем интерцептор для получения CSRF-токена перед запросами
api.interceptors.request.use(async (config) => {
  if (
    !document.cookie.includes('XSRF-TOKEN') && 
    config.method !== 'get' && 
    config.method !== 'head'
  ) {
    await getCsrfToken();
  }
  return config;
});

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      config: error.config,
      response: error.response?.data,
      status: error.response?.status
    });
    return Promise.reject(error);
  }
);

// Экспортируем функции для работы с API
export const login = async (email: string, password: string) => {
  try {
    const { data } = await api.post('/auth/login', {
      email,
      password
    });
    return data;
  } catch (error) {
    console.error('Login error details:', error);
    throw error;
  }
}

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await api.post('/auth/register', data);
  return response.data;
}

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('user');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get('/me');
    console.log('Fetched user data:', response.data); // Для отладки
    return response.data.user; // Убедимся, что возврщаем правильную структуру данных
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Products
export const fetchProducts = async (filters?: {
  gender?: string;
  condition?: string;
  size?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  limit?: string;
}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
    }

    const url = `/products${params.toString() ? `?${params.toString()}` : ''}`;
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProduct = async (id: string) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const createProduct = async (productData: FormData) => {
  try {
    // Сначала получаем CSRF токен
    await getCsrfToken();
    
    const { data } = await api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: FormData) => {
  const { data } = await api.post(`/products/${id}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

// Search
export const searchProducts = async (query: string) => {
  try {
    const { data } = await api.get(`/search?q=${encodeURIComponent(query)}`);
    return data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

// Categories
export const fetchCategories = async () => {
  try {
    const { data } = await api.get('/categories');
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchCategoryProducts = async (
  slug: string,
  filters?: {
    gender?: string;
    condition?: string;
    size?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }
) => {
  try {
    // Создаем объект с параметрами запроса
    const params = new URLSearchParams();
    
    // Добавляем только непустые значения фильтров
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
    }

    // Формируем URL с параметрами
    const url = `/categories/${slug}/products${params.toString() ? `?${params.toString()}` : ''}`;
    
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching category products:', error);
    throw error;
  }
};

export const fetchCategoryById = async (id: string) => {
  try {
    const { data } = await api.get(`/categories/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

// Если нужно управление категориями в админке
export const createCategory = async (categoryData: FormData) => {
  try {
    const { data } = await api.post('/admin/categories', categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id: string, categoryData: FormData) => {
  try {
    const { data } = await api.post(`/admin/categories/${id}`, categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const { data } = await api.delete(`/admin/categories/${id}`);
    return data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Cart
export const fetchCart = async () => {
  const { data } = await api.get('/cart')
  return data
}

export const addToCart = async (productId: string, quantity: number = 1) => {
  const { data } = await api.post('/cart/add', { 
    product_id: productId, 
    quantity 
  })
  return data
}

export const updateCartItem = async (cartItemId: number, quantity: number) => {
  const { data } = await api.put(`/cart/${cartItemId}`, { quantity })
  return data
}

export const removeFromCart = async (cartItemId: number) => {
  const { data } = await api.delete(`/cart/${cartItemId}`)
  return data
}

// Orders
export const fetchOrders = async () => {
  const { data } = await api.get('/orders');
  return data;
};

export const createOrder = async (orderData: {
  delivery_address: string
}) => {
  try {
    // Добавим логирование для отладки
    console.log('Creating order with data:', orderData);
    
    const { data } = await api.post('/orders', orderData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Order created successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Create order error details:', {
      message: error.message,
      response: error.response?.data
    });
    throw error;
  }
};

// Favorites
export const fetchFavorites = async () => {
  const { data } = await api.get('/favorites');
  return data;
};

export const toggleFavorite = async (productId: string) => {
  const { data } = await api.post(`/products/${productId}/favorite`);
  return data;
};

// Reviews
export const createReview = async (productId: string, reviewData: any) => {
  const { data } = await api.post(`/products/${productId}/reviews`, reviewData);
  return data;
};

export const updateReview = async (reviewId: string, reviewData: any) => {
  const { data } = await api.put(`/reviews/${reviewId}`, reviewData);
  return data;
};

export const deleteReview = async (reviewId: string) => {
  const { data } = await api.delete(`/reviews/${reviewId}`);
  return data;
};

// Discounts
export const fetchDiscounts = async () => {
  const { data } = await api.get('/admin/discounts');
  return data;
};

export const createDiscount = async (discountData: any) => {
  const { data } = await api.post('/admin/discounts', discountData);
  return data;
};

export const updateDiscount = async (id: string, discountData: any) => {
  const { data } = await api.put(`/admin/discounts/${id}`, discountData);
  return data;
};

export const deleteDiscount = async (id: string) => {
  const { data } = await api.delete(`/admin/discounts/${id}`);
  return data;
};

// Добавим новые методы
export const fetchUserSales = async () => {
  const { data } = await api.get('/user/sales');
  return data;
};

export const fetchUserPurchases = async () => {
  const { data } = await api.get('/user/purchases');
  return data;
};

export const updateProfile = async (data: FormData) => {
  try {
    // Преобразуем FormData в объект для отправки
    const formDataObj: Record<string, any> = {};
    data.forEach((value, key) => {
      // Пропускаем пустые знаения
      if (value !== '' && value !== null && value !== undefined) {
        formDataObj[key] = value;
      }
    });

    console.log('Sending data:', formDataObj); // Для отладки

    const response = await api.put('/profile', formDataObj);

    // Для отладки
    console.log('Server response:', response.data);

    // Обновляем кэш пользователя
    await api.get('/me');

    return response.data;
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};

export const sendPasswordResetLink = async (email: string) => {
  try {
    const response = await api.post('/forgot-password', { 
      email,
      _token: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    });
    return response.data;
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

export const resetPassword = async (data: {
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const response = await api.post('/reset-password', data);
    return response.data;
  } catch (error: any) {
    console.error('Password reset error:', error.response?.data);
    throw error;
  }
};

export const uploadPaymentProof = async (orderId: number, data: FormData) => {
  const response = await api.post(`/orders/${orderId}/payment`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const confirmDelivery = async (orderId: number) => {
  const response = await api.post(`/orders/${orderId}/delivery`);
  return response.data;
};

export const fetchOrder = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};