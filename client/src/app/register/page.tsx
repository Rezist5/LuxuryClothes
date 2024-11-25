'use client'

import { useState } from 'react'
import { register } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      await register(formData)
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.response?.data?.message || 'Ошибка регистрации')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* форма регистрации */}
    </form>
  )
} 