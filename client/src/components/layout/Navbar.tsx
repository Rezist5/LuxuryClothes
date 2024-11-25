'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { fetchUser, logout, fetchCart } from '@/lib/api'
import Image from 'next/image'
import { Menu, MenuButton, MenuItems, MenuItem } from '@/components/ui/menu'
import { useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-hot-toast'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'Sell', href: '/sell' }
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery('user', fetchUser, {
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  const { data: cartItems } = useQuery('cart', fetchCart, {
    enabled: !!user
  })

  const cartItemsCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0

  const handleLogout = async () => {
    try {
      await logout();
      
      // Очищаем состояние пользователя
      queryClient.setQueryData('user', null);
      queryClient.invalidateQueries('user');
      
      // Перенаправляем на страницу входа и обновляем страницу
      router.push('/login');
      window.location.reload(); // Принудительно обновляем страницу
      
      toast.success('Вы успешно вышли из системы');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Ошибка при выходе из системы');
    }
  };

  // Функция для безопасного отображения аватара
  const renderAvatar = () => {
    if (!user?.avatar_url) {
      return (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-sm text-gray-600">
            {user?.name?.charAt(0) || '?'}
          </span>
        </div>
      )
    }

    // Используем обычный img для аватара
    return (
      <img
        src={user.avatar_url}
        alt={user.name}
        className="w-8 h-8 rounded-full object-cover"
        onError={(e) => {
          // Если изображение не загрузилось, показываем первую букву имени
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Предотвращаем бесконечный цикл
          target.style.display = 'none';
          target.parentElement!.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span class="text-sm text-gray-600">${user.name.charAt(0)}</span>
            </div>
          `;
        }}
      />
    )
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-gray-900">LuxSwap</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 ${
                pathname === item.href
                  ? 'text-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center space-x-4">
          <Link
            href="/cart"
            className="flex items-center text-gray-600 hover:text-gray-900 relative"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <Menu as="div" className="relative ml-3">
              <MenuButton className="flex items-center space-x-2">
                {renderAvatar()}
                <span>{user.name}</span>
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  <Link href="/profile" className="block px-4 py-2">
                    Профиль
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2"
                  >
                    Выйти
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
            >
              Войти <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-2xl font-bold">LuxSwap</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      href="/cart"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <ShoppingCartIcon className="h-6 w-6 mr-2" />
                        Корзина
                        {cartItemsCount > 0 && (
                          <span className="ml-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                            {cartItemsCount}
                          </span>
                        )}
                      </div>
                    </Link>
                    
                    {user ? (
                      <>
                        <Link
                          href="/profile"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Профиль
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout()
                            setMobileMenuOpen(false)
                          }}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Выйти
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Войти
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}