'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { resetPassword } from '@/lib/api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from 'react-hot-toast'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Button clicked!')
    
    if (!email) {
      console.log('No email found')
      toast.error('Email обязателен')
      return
    }

    if (password.length < 8) {
      console.log('Password too short')
      toast.error('Пароль должен содержать минимум 8 символов')
      return
    }

    if (password !== passwordConfirmation) {
      console.log('Passwords don\'t match')
      toast.error('Пароли не совпадают')
      return
    }

    try {
      console.log('Attempting to reset password...')
      setLoading(true)
      await resetPassword({
        email,
        password,
        password_confirmation: passwordConfirmation
      })
      
      console.log('Password reset successful')
      toast.success('Пароль успешно изменен')
      router.push('/login')
    } catch (error: any) {
      console.error('Reset password error:', error)
      const errorMessage = error.response?.data?.error || 'Не удалось изменить пароль'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-md py-12">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6">Сброс пароля</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="password"
            placeholder="Новый пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Подтвердите пароль"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-primary text-white hover:bg-primary/90"
        >
          {loading ? 'Сохранение...' : 'Сохранить новый пароль'}
        </Button>
      </form>
    </div>
  )
} 