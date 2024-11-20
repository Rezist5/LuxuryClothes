<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Product $product)
    {
        $reviews = $product->reviews()
            ->with('user:id,name')
            ->latest()
            ->paginate(10);

        return response()->json([
            'reviews' => $reviews,
            'average_rating' => $product->average_rating,
            'reviews_count' => $product->reviews_count
        ]);
    }

    public function store(Request $request, Product $product)
    {
        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:1000'
        ]);

        // Проверяем, купил ли пользователь товар
        $hasPurchased = $product->orders()
            ->whereHas('order', function ($query) {
                $query->where('user_id', auth()->id())
                    ->where('status', 'completed');
            })
            ->exists();

        if (!$hasPurchased) {
            return response()->json([
                'message' => 'Вы можете оставить отзыв только после покупки товара'
            ], 403);
        }

        // Проверяем, не оставлял ли пользователь уже отзыв
        $existingReview = $product->reviews()
            ->where('user_id', auth()->id())
            ->first();

        if ($existingReview) {
            return response()->json([
                'message' => 'Вы уже оставили отзыв для этого товара'
            ], 400);
        }

        $review = $product->reviews()->create([
            'user_id' => auth()->id(),
            'rating' => $request->rating,
            'comment' => $request->comment
        ]);

        return response()->json($review->load('user:id,name'), 201);
    }

    public function update(Request $request, Review $review)
    {
        $this->authorize('update', $review);

        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:1000'
        ]);

        $review->update($request->only(['rating', 'comment']));

        return response()->json($review->load('user:id,name'));
    }

    public function destroy(Review $review)
    {
        $this->authorize('delete', $review);
        
        $review->delete();

        return response()->json(['message' => 'Отзыв успешно удален']);
    }
} 