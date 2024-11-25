'use client'

import { useRef, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ImageUploadProps {
  images: File[]
  onChange: (images: File[]) => void
  maxImages?: number
}

export default function ImageUpload({ images, onChange, maxImages = 4 }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      
      img.onload = () => {
        URL.revokeObjectURL(img.src)
        resolve(img.width <= 1000 && img.height <= 1000)
      }

      img.onerror = () => {
        URL.revokeObjectURL(img.src)
        resolve(false)
      }
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setError(null)

    // Проверяем каждое изображение
    for (const file of files) {
      const isValidSize = await validateImage(file)
      if (!isValidSize) {
        setError('Изображения должны быть не более 1000x1000 пикселей')
        return
      }
    }

    const newImages = [...images, ...files].slice(0, maxImages)
    onChange(newImages)
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400"
          >
            <span className="text-sm text-gray-600">Добавить фото</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-500 mt-2">
          {error}
        </p>
      )}

      <p className="text-sm text-gray-500">
        Максимум {maxImages} фотографий. Размер изображения не должен превышать 1000x1000 пикселей
      </p>
    </div>
  )
} 