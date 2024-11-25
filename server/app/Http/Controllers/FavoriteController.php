<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = auth()->user()->favoriteProducts()
            ->with(['images', 'category'])
            ->paginate(12);

        return response()->json($favorites);
    }

    public function store(Product $product)
    {
        $favorite = auth()->user()->favorites()
            ->firstOrCreate(['product_id' => $product->id]);

        return response()->json([
            'message' => 'Товар добавлен в избранное',
            'favorite' => $favorite
        ], 201);
    }

    public function destroy(Product $product)
    {
        auth()->user()->favorites()
            ->where('product_id', $product->id)
            ->delete();

        return response()->json([
            'message' => 'Товар удален из избранного'
        ]);
    }
} 