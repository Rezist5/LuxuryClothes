'use client'

import { useState } from 'react'

interface FilterProps {
  filters: {
    gender: string;
    condition: string;
    size: string;
    minPrice: string;
    maxPrice: string;
    sort: string;
  };
  onFilterChange: (filters: FilterProps['filters']) => void;
}

export default function ProductFilters({ filters, onFilterChange }: FilterProps) {
  return (
    <div className="space-y-6">
      {/* Сортировка */}
      <div>
        <h3 className="text-lg font-medium">Сортировка</h3>
        <select
          value={filters.sort}
          onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
          className="mt-2 block w-full rounded-md border-gray-300"
        >
          <option value="latest">Сначала новые</option>
          <option value="price_asc">Сначала дешевле</option>
          <option value="price_desc">Сначала дороже</option>
          <option value="popular">По популярности</option>
        </select>
      </div>

      {/* Размер */}
      <div>
        <h3 className="text-lg font-medium">Размер</h3>
        <select
          value={filters.size}
          onChange={(e) => onFilterChange({ ...filters, size: e.target.value })}
          className="mt-2 block w-full rounded-md border-gray-300"
        >
          <option value="">Все размеры</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>

      {/* Пол */}
      <div>
        <h3 className="text-lg font-medium">Пол</h3>
        <select
          value={filters.gender}
          onChange={(e) => onFilterChange({ ...filters, gender: e.target.value })}
          className="mt-2 block w-full rounded-md border-gray-300"
        >
          <option value="">Все</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="unisex">Унисекс</option>
        </select>
      </div>

      {/* Состояние */}
      <div>
        <h3 className="text-lg font-medium">Состояние</h3>
        <select
          value={filters.condition}
          onChange={(e) => onFilterChange({ ...filters, condition: e.target.value })}
          className="mt-2 block w-full rounded-md border-gray-300"
        >
          <option value="">Все</option>
          <option value="new">Новое</option>
          <option value="like_new">Как новое</option>
          <option value="good">Хорошее</option>
          <option value="fair">Удовлетворительное</option>
        </select>
      </div>

      {/* Цена */}
      <div>
        <h3 className="text-lg font-medium">Цена</h3>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="От"
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
            className="block w-full rounded-md border-gray-300"
          />
          <input
            type="number"
            placeholder="До"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
            className="block w-full rounded-md border-gray-300"
          />
        </div>
      </div>
    </div>
  )
} 