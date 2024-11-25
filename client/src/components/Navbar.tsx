'use client'

import Link from 'next/link'
import { useQuery } from 'react-query'
import { fetchCart } from '@/lib/api'

interface CartItem {
  id: number
  quantity: number
}

export default function Navbar() {
  const { data: cartItems } = useQuery<CartItem[]>('cart', fetchCart)
  const cartItemsCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Левая часть навигации */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-black">
              LuxSwap
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/shop" className="text-gray-600 hover:text-black">
                Shop
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-black">
                Categories
              </Link>
              <Link href="/sell" className="text-gray-600 hover:text-black">
                Sell
              </Link>
            </div>
          </div>

          {/* Правая часть навигации */}
          <div className="flex items-center space-x-6">
            {/* Корзина */}
            <Link 
              href="/cart" 
              className="flex items-center text-gray-600 hover:text-black"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="ml-2 hidden md:inline">Cart</span>
            </Link>

            {/* Админ панель */}
            <Link href="/admin" className="text-gray-600 hover:text-black">
              A
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 