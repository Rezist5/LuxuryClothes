<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\ProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()
            ->with(['category', 'images'])
            ->where('status', Product::STATUS_ACTIVE);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('brand')) {
            $query->where('brand', $request->brand);
        }

        if ($request->has('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }

        if ($request->has('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }

        return response()->json($query->paginate(12));
    }

    public function show(Product $product)
    {
        return response()->json(
            $product->load(['category', 'images', 'seller:id,name'])
        );
    }

    public function store(ProductRequest $request)
    {
        try {
            \DB::beginTransaction();

            $product = Product::create([
                ...$request->validated(),
                'seller_id' => auth()->id(),
                'status' => Product::STATUS_PENDING,
            ]);

            if ($request->hasFile('images')) {
                $primarySet = false;
                foreach ($request->file('images') as $index => $image) {
                    try {
                        $path = $image->store('products', 'public');
                        $product->images()->create([
                            'image_path' => $path,
                            'is_primary' => !$primarySet,
                        ]);
                        $primarySet = true;
                    } catch (\Exception $e) {
                        \Log::error('Image upload failed: ' . $e->getMessage());
                        throw new \Exception('Failed to upload image');
                    }
                }
            }

            \DB::commit();
            return response()->json($product->load('images'), 201);

        } catch (\Exception $e) {
            \DB::rollBack();
            return response()->json([
                'message' => 'Failed to create product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(ProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);
        
        $product->update($request->validated());

        if ($request->hasFile('images')) {
            // Удаляем старые изображения
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->image_path);
            }
            $product->images()->delete();

            // Загружаем новые изображения
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'image_path' => $path,
                    'is_primary' => $index === 0,
                ]);
            }
        }

        return response()->json($product->load('images'));
    }

    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);

        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }
        
        $product->delete();

        return response()->json(['message' => 'Товар успешно удален']);
    }
} 