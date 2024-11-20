<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $users = User::where('role', 'user')->get();
        $products = Product::where('status', 'active')->get();

        foreach ($users as $user) {
            // Создаем от 0 до 3 заказов для каждого пользователя
            $orderCount = rand(0, 3);
            
            for ($i = 0; $i < $orderCount; $i++) {
                $order = Order::factory()->create([
                    'user_id' => $user->id,
                    'status' => rand(0, 1) ? 'completed' : 'pending',
                ]);

                // Добавляем от 1 до 4 товаров в заказ
                $orderProducts = $products->random(rand(1, 4));
                $totalAmount = 0;

                foreach ($orderProducts as $product) {
                    OrderItem::factory()->create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'price' => $product->price,
                    ]);
                    $totalAmount += $product->price;
                }

                $order->update(['total_amount' => $totalAmount]);
            }
        }
    }
} 