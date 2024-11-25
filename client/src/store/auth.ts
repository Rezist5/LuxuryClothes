import create from 'zustand';
import Cookies from 'js-cookie';
import { login, register, logout, fetchUser } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  login: async (credentials) => {
    set({ loading: true });
    try {
      const { user, token } = await login(credentials);
      Cookies.set('token', token);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  register: async (userData) => {
    set({ loading: true });
    try {
      const { user, token } = await register(userData);
      Cookies.set('token', token);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await logout();
      Cookies.remove('token');
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    const token = Cookies.get('token');
    if (!token) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    try {
      const { user } = await fetchUser();
      set({ user, isAuthenticated: true });
    } catch (error) {
      Cookies.remove('token');
      set({ user: null, isAuthenticated: false });
    }
  },
}));