<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()
            ->where('status', Product::STATUS_ACTIVE)
            ->with('seller:id,name');

        // Фильтры
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

        // Лимит записей, если указан
        if ($request->filled('limit')) {
            $query->limit($request->limit);
        }

        // Пагинация по 12 товаров, если не указан лимит
        $products = $request->filled('limit') ? $query->get() : $query->paginate(12);

        return response()->json($products);
    }

    public function show($id)
    {
        try {
            $product = Product::with(['category', 'seller'])
                ->where('status', Product::STATUS_ACTIVE)
                ->findOrFail($id);

            return response()->json($product);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        } catch (\Exception $e) {
            Log::error('Error in product show: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch product'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            Log::info('Incoming product data:', $request->all());

            // Проверяем, есть ли файлы изображений
            if (!$request->hasFile('images')) {
                return response()->json([
                    'message' => 'Validation error',
                    'errors' => ['images' => ['At least one image is required']]
                ], 422);
            }

            // Валидация остальных полей
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric|min:0',
                'category_id' => 'required|exists:categories,id',
                'brand' => 'nullable|string|max:255',
                'size' => 'required|string|max:10',
                'condition' => 'required|in:new,like_new,good,fair',
                'color' => 'required|string|max:50',
                'material' => 'nullable|string|max:50',
                'style' => 'nullable|string|max:50',
                'gender' => 'nullable|string|in:male,female,unisex',
            ]);

            // Загружаем изображения
            $images = [];
            foreach ($request->file('images') as $image) {
                // Валидация каждого изображения
                if (!$image->isValid() || 
                    !in_array($image->getClientMimeType(), ['image/jpeg', 'image/png', 'image/webp']) ||
                    $image->getSize() > 5120 * 1024 // 5MB max
                ) {
                    return response()->json([
                        'message' => 'Validation error',
                        'errors' => ['images' => ['Invalid image format or size']]
                    ], 422);
                }

                // Проверяем размеры изображения
                list($width, $height) = getimagesize($image->getPathname());
                if ($width > 1000 || $height > 1000) {
                    return response()->json([
                        'message' => 'Validation error',
                        'errors' => ['images' => ['Image dimensions must not exceed 1000x1000 pixels']]
                    ], 422);
                }

                $path = $image->store('products', 'public');
                $images[] = asset('storage/' . $path);
            }

            if (empty($images)) {
                return response()->json([
                    'message' => 'Validation error',
                    'errors' => ['images' => ['Failed to upload images']]
                ], 422);
            }

            // Создаем продукт
            $product = Product::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'price' => $validated['price'],
                'category_id' => $validated['category_id'],
                'brand' => $validated['brand'] ?? null,
                'size' => $validated['size'],
                'condition' => $validated['condition'],
                'color' => $validated['color'],
                'material' => $validated['material'] ?? null,
                'style' => $validated['style'] ?? null,
                'gender' => $validated['gender'] ?? 'unisex',
                'seller_id' => auth()->id(),
                'status' => Product::STATUS_ACTIVE,
                'images' => $images,
                'is_featured' => false,
                'views_count' => 0,
            ]);

            Log::info('Product created:', $product->toArray());

            return response()->json($product, 201);

        } catch (ValidationException $e) {
            Log::error('Validation error:', $e->errors());
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating product: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create product',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 