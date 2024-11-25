import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Добавляем заголовки для работы с Laravel Sanctum
  res.headers.append('Accept', 'application/json')
  res.headers.append('X-Requested-With', 'XMLHttpRequest')

  // Получаем текущий путь
  const path = req.nextUrl.pathname

  // Публичные маршруты, которые не требуют аутентификации
  const publicRoutes = ['/', '/login', '/register', '/about', '/products']
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route))
  
  // Если это публичный маршрут, пропускаем проверку
  if (isPublicRoute) {
    return res
  }

  // Если это маршрут логина или регистрации, пропускаем проверку
  if (path === '/login' || path === '/register') {
    return res
  }

  // Проверяем аутентификацию только для защищенных маршрутов
  const isAuthenticated = await checkAuth(req)
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

async function checkAuth(req: NextRequest) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: {
        'Cookie': req.headers.get('cookie') || '',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include'
    })
    return response.ok
  } catch {
    return false
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
  ],
}