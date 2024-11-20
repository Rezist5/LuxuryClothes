<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;

class SearchService
{
    public function searchProducts($query, array $filters = [])
    {
        $productsQuery = Product::query()
            ->where('status', Product::STATUS_ACTIVE)
            ->with(['category', 'images']);

        // Применяем поисковый запрос
        if ($query) {
            $productsQuery->where(function (Builder $q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhere('brand', 'like', "%{$query}%")
                    ->orWhereHas('category', function ($q) use ($query) {
                        $q->where('name', 'like', "%{$query}%");
                    });
            });
        }

        // Применяем фильтры
        if (isset($filters['category_id'])) {
            $productsQuery->where('category_id', $filters['category_id']);
        }

        if (isset($filters['brand'])) {
            $productsQuery->where('brand', $filters['brand']);
        }

        if (isset($filters['price_min'])) {
            $productsQuery->where('price', '>=', $filters['price_min']);
        }

        if (isset($filters['price_max'])) {
            $productsQuery->where('price', '<=', $filters['price_max']);
        }

        if (isset($filters['condition'])) {
            $productsQuery->where('condition', $filters['condition']);
        }

        // Сортировка
        $sortField = $filters['sort_by'] ?? 'created_at';
        $sortDirection = $filters['sort_direction'] ?? 'desc';
        $productsQuery->orderBy($sortField, $sortDirection);

        return $productsQuery->paginate(12);
    }

    public function getSearchSuggestions($query)
    {
        $suggestions = [];

        // Поиск по названиям товаров
        $products = Product::where('name', 'like', "%{$query}%")
            ->where('status', Product::STATUS_ACTIVE)
            ->limit(5)
            ->get(['name']);

        foreach ($products as $product) {
            $suggestions[] = [
                'type' => 'product',
                'value' => $product->name
            ];
        }

        // Поиск по брендам
        $brands = Product::where('brand', 'like', "%{$query}%")
            ->where('status', Product::STATUS_ACTIVE)
            ->distinct()
            ->limit(3)
            ->pluck('brand');

        foreach ($brands as $brand) {
            $suggestions[] = [
                'type' => 'brand',
                'value' => $brand
            ];
        }

        return $suggestions;
    }
} 