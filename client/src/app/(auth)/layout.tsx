'use client'

import { AuthProvider } from '../auth/AuthProvider'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  )
} 