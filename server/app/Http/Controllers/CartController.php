<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = CartItem::with('product')
            ->where('user_id', auth()->id())
            ->get();

        return response()->json($cartItems);
    }

    public function addToCart(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'product_id' => $validated['product_id']
            ],
            [
                'quantity' => $validated['quantity']
            ]
        );

        return response()->json(['message' => 'Товар добавлен в корзину', 'cart_item' => $cartItem]);
    }

    public function updateQuantity(Request $request, CartItem $cartItem): JsonResponse
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem->update(['quantity' => $validated['quantity']]);

        return response()->json(['message' => 'Количество обновлено', 'cart_item' => $cartItem]);
    }

    public function removeFromCart(CartItem $cartItem): JsonResponse
    {
        $cartItem->delete();

        return response()->json(['message' => 'Товар удален из корзины']);
    }
} 