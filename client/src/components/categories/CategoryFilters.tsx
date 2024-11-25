'use client'

import { useState } from 'react'

type FilterProps = {
  onFilterChange: (filters: any) => void
}

export default function CategoryFilters({ onFilterChange }: FilterProps) {
  const [gender, setGender] = useState('')
  const [hasProducts, setHasProducts] = useState(false)
  const [sortBy, setSortBy] = useState('name')

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    let newFilters: any = {}

    switch (filterType) {
      case 'gender':
        setGender(value as string)
        newFilters.gender = value
        break
      case 'hasProducts':
        setHasProducts(value as boolean)
        newFilters.hasProducts = value
        break
      case 'sortBy':
        setSortBy(value as string)
        newFilters.sortBy = value
        break
    }

    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Фильтры</h3>
      </div>

      {/* Пол */}
      <div>
        <h4 className="text-sm font-medium text-gray-900">Пол</h4>
        <div className="mt-2 space-y-2">
          {['all', 'male', 'female', 'unisex'].map((genderOption) => (
            <label key={genderOption} className="flex items-center">
              <input
                type="radio"
                name="gender"
                value={genderOption}
                checked={gender === genderOption}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="h-4 w-4 border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-sm text-gray-600 capitalize">
                {genderOption === 'all' ? 'Все' : genderOption}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Только с товарами */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={hasProducts}
            onChange={(e) => handleFilterChange('hasProducts', e.target.checked)}
            className="h-4 w-4 border-gray-300 text-black focus:ring-black rounded"
          />
          <span className="ml-2 text-sm text-gray-600">
            Только с товарами
          </span>
        </label>
      </div>

      {/* Сортировка */}
      <div>
        <h4 className="text-sm font-medium text-gray-900">Сортировка</h4>
        <select
          value={sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 text-base focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        >
          <option value="name">По названию</option>
          <option value="products_count">По количеству товаров</option>
          <option value="latest">Сначала новые</option>
        </select>
      </div>

      {/* Кнопка сброса */}
      <button
        onClick={() => {
          setGender('')
          setHasProducts(false)
          setSortBy('name')
          onFilterChange({})
        }}
        className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Сбросить фильтры
      </button>
    </div>
  )
} 