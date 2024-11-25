<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function sales()
    {
        try {
            Log::info('Fetching sales for user: ' . auth()->id());

            // Получаем все товары пользователя, которые были проданы
            $products = Product::select('id', 'name', 'price', 'images')
                ->where('seller_id', auth()->id())
                ->whereExists(function ($query) {
                    $query->select(DB::raw(1))
                        ->from('order_items')
                        ->whereColumn('order_items.product_id', 'products.id');
                })
                ->with(['orderItems' => function ($query) {
                    $query->select('id', 'product_id', 'order_id', 'quantity', 'price', 'created_at')
                        ->with(['order' => function ($query) {
                            $query->select('id', 'status', 'payment_status', 'created_at');
                        }]);
                }])
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => (float)$product->price,
                        'images' => $product->images ?? [],
                        'orderItems' => $product->orderItems->map(function ($item) {
                            return [
                                'id' => $item->id,
                                'quantity' => $item->quantity,
                                'price' => (float)$item->price,
                                'subtotal' => (float)($item->price * $item->quantity),
                                'created_at' => $item->created_at->toDateTimeString(),
                                'order' => [
                                    'id' => $item->order->id,
                                    'status' => $item->order->status,
                                    'payment_status' => $item->order->payment_status,
                                    'created_at' => $item->order->created_at->toDateTimeString()
                                ]
                            ];
                        })
                    ];
                });

            Log::info('Sales data prepared successfully', ['count' => $products->count()]);
            return response()->json($products);

        } catch (\Exception $e) {
            Log::error('Sales error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'error' => 'Failed to fetch sales',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function purchases()
    {
        try {
            Log::info('Fetching purchases for user: ' . auth()->id());

            $purchases = Order::with(['items' => function ($query) {
                    $query->with('product:id,name,price,images');
                }])
                ->where('user_id', auth()->id())
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'total_amount' => (float)$order->total_amount,
                        'status' => $order->status,
                        'payment_status' => $order->payment_status,
                        'delivery_status' => $order->delivery_status,
                        'created_at' => $order->created_at->toDateTimeString(),
                        'items' => $order->items->map(function ($item) {
                            return [
                                'id' => $item->id,
                                'quantity' => $item->quantity,
                                'price' => (float)$item->price,
                                'subtotal' => (float)($item->price * $item->quantity),
                                'product' => $item->product ? [
                                    'id' => $item->product->id,
                                    'name' => $item->product->name,
                                    'price' => (float)$item->product->price,
                                    'images' => $item->product->images ?? []
                                ] : null
                            ];
                        })->filter(function ($item) {
                            return $item['product'] !== null;
                        })
                    ];
                });

            Log::info('Purchases data prepared successfully', ['count' => $purchases->count()]);
            return response()->json($purchases);

        } catch (\Exception $e) {
            Log::error('Purchases error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'error' => 'Failed to fetch purchases',
                'message' => $e->getMessage()
            ], 500);
        }
    }
} 