<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['items.product'])
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function show(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($order->load(['items.product']));
    }

    public function store(Request $request)
    {
        $request->validate([
            'delivery_address' => 'required|string|max:255'
        ]);

        try {
            return DB::transaction(function () use ($request) {
                // Получаем корзину пользователя
                $cartItems = CartItem::with('product')
                    ->where('user_id', auth()->id())
                    ->get();

                if ($cartItems->isEmpty()) {
                    return response()->json(['error' => 'Cart is empty'], 400);
                }

                // Проверяем наличие продуктов
                foreach ($cartItems as $cartItem) {
                    if (!$cartItem->product) {
                        \Log::error('Product not found for cart item: ' . $cartItem->id);
                        return response()->json(['error' => 'Some products are no longer available'], 400);
                    }
                }

                // Вычисляем общую сумму
                $total = $cartItems->sum(function ($item) {
                    return $item->product->price * $item->quantity;
                });

                // Создаем заказ с правильным именем колонки delivery_address
                $order = Order::create([
                    'user_id' => auth()->id(),
                    'total_amount' => $total,
                    'delivery_address' => $request->delivery_address,
                    'status' => 'pending',
                    'payment_status' => 'pending',
                    'delivery_status' => 'pending'
                ]);

                // Создаем элементы заказа из корзины
                foreach ($cartItems as $cartItem) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $cartItem->product_id,
                        'quantity' => $cartItem->quantity,
                        'price' => $cartItem->product->price,
                        'subtotal' => $cartItem->product->price * $cartItem->quantity
                    ]);
                }

                // Очищаем корзину пользователя
                CartItem::where('user_id', auth()->id())->delete();

                // Загружаем связанные данные и возвращаем заказ
                $order->load('items.product');
                
                return response()->json($order);
            });
        } catch (\Exception $e) {
            \Log::error('Order creation error: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'error' => 'Failed to create order',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function uploadPaymentProof(Request $request, Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'payment_proof' => 'required|image|max:2048'
        ]);

        try {
            $path = $request->file('payment_proof')->store('payment_proofs', 'public');
            
            $order->update([
                'payment_proof' => $path,
                'payment_status' => 'paid',
                'paid_at' => now()
            ]);

            return response()->json($order);
        } catch (\Exception $e) {
            \Log::error('Payment proof upload error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to upload payment proof'], 500);
        }
    }
} 