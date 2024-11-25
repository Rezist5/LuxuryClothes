<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount(['products' => function($query) {
            $query->where('status', Product::STATUS_ACTIVE);
        }])
        ->get()
        ->map(function ($category) {
            $firstProduct = $category->products()
                ->where('status', Product::STATUS_ACTIVE)
                ->first();

            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'gender' => ucfirst($category->gender),
                'type' => $category->type,
                'products_count' => $category->products_count,
                'description' => $category->description,
                'image' => $firstProduct && !empty($firstProduct->images) 
                    ? $firstProduct->images[0] 
                    : null
            ];
        });

        return response()->json($categories);
    }

    public function products(Request $request, $slug)
    {
        try {
            $category = Category::where('slug', $slug)->firstOrFail();
            
            $query = Product::where('category_id', $category->id)
                ->where('status', Product::STATUS_ACTIVE);

            // Фильтры (как в ProductController)
            if ($request->filled('gender')) {
                $query->where('gender', $request->gender);
            }

            if ($request->filled('condition')) {
                $query->where('condition', $request->condition);
            }

            if ($request->filled('size')) {
                $query->where('size', $request->size);
            }

            if ($request->filled('minPrice')) {
                $query->where('price', '>=', (float)$request->minPrice);
            }

            if ($request->filled('maxPrice')) {
                $query->where('price', '<=', (float)$request->maxPrice);
            }

            // Сортировка
            switch ($request->get('sort', 'latest')) {
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'popular':
                    $query->orderBy('views_count', 'desc');
                    break;
                default:
                    $query->latest();
                    break;
            }

            $products = $query->with(['seller:id,name'])->paginate(12);

            return response()->json([
                'category' => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'gender' => ucfirst($category->gender),
                    'type' => $category->type,
                    'products_count' => $category->products()->where('status', Product::STATUS_ACTIVE)->count()
                ],
                'products' => $products
            ]);

        } catch (\Exception $e) {
            \Log::error('Category products error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch category products'], 500);
        }
    }
} 