<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = CartItem::where('user_id', auth()->id())
            ->with(['product' => function ($query) {
                $query->with(['images', 'category'])
                    ->withAvg('reviews', 'rating');
            }])
            ->get();

        $total = $cartItems->sum(function ($item) {
            return $item->product->price;
        });

        return response()->json([
            'items' => $cartItems,
            'total' => $total
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        try {
            DB::beginTransaction();

            $product = Product::lockForUpdate()->findOrFail($request->product_id);

            if ($product->status !== Product::STATUS_ACTIVE) {
                throw new \Exception('Товар недоступен для покупки');
            }

            $existingItem = CartItem::where('user_id', auth()->id())
                ->where('product_id', $request->product_id)
                ->first();

            if ($existingItem) {
                throw new \Exception('Товар уже в корзине');
            }

            $cartItem = CartItem::create([
                'user_id' => auth()->id(),
                'product_id' => $request->product_id
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Товар добавлен в корзину',
                'item' => $cartItem->load('product.images')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function remove(CartItem $cartItem)
    {
        try {
            $this->authorize('delete', $cartItem);
            
            DB::beginTransaction();
            
            $cartItem->delete();
            
            DB::commit();

            return response()->json([
                'message' => 'Товар удален из корзины'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Ошибка при удалении товара из корзины'
            ], 500);
        }
    }

    public function clear()
    {
        try {
            DB::beginTransaction();
            
            CartItem::where('user_id', auth()->id())->delete();
            
            DB::commit();

            return response()->json([
                'message' => 'Корзина очищена'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Ошибка при очистке корзины'
            ], 500);
        }
    }
} 