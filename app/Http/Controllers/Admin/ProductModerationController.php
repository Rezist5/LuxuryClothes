<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Notifications\ProductStatusChanged;
use Illuminate\Http\Request;

class ProductModerationController extends Controller
{
    public function pendingProducts(Request $request)
    {
        $query = Product::where('status', Product::STATUS_PENDING)
            ->with(['category', 'seller', 'images']);

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('brand', 'like', "%{$request->search}%");
            });
        }

        $products = $query->latest()->paginate(15);

        return response()->json($products);
    }

    public function approveProduct(Product $product)
    {
        if ($product->status !== Product::STATUS_PENDING) {
            return response()->json([
                'message' => 'Товар уже обработан'
            ], 400);
        }

        $product->update(['status' => Product::STATUS_ACTIVE]);
        
        $product->seller->notify(new ProductStatusChanged($product));

        return response()->json($product);
    }

    public function rejectProduct(Request $request, Product $product)
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:1000',
        ]);

        if ($product->status !== Product::STATUS_PENDING) {
            return response()->json([
                'message' => 'Товар уже обработан'
            ], 400);
        }

        $product->update([
            'status' => Product::STATUS_REJECTED,
            'rejection_reason' => $request->rejection_reason,
        ]);

        $product->seller->notify(new ProductStatusChanged($product));

        return response()->json($product);
    }

    public function deleteProduct(Product $product)
    {
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }
        
        $product->delete();

        return response()->json([
            'message' => 'Товар успешно удален'
        ]);
    }
} 