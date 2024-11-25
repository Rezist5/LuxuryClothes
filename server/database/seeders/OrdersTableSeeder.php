<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\Product;
use Faker\Factory as Faker;

class OrdersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $users = User::all();
        $products = Product::all();

        foreach ($users as $user) {
            // Создаем от 1 до 5 заказов для каждого пользователя
            $orderCount = rand(1, 5);
            
            for ($i = 0; $i < $orderCount; $i++) {
                // Создаем заказ
                $order = Order::create([
                    'user_id' => $user->id,
                    'total_amount' => 0, // Пересчитаем после добавления товаров
                    'delivery_address' => $faker->address,
                    'status' => $faker->randomElement(['pending', 'processing', 'completed', 'cancelled']),
                    'payment_status' => $faker->randomElement(['pending', 'paid', 'failed']),
                    'delivery_status' => $faker->randomElement(['pending', 'shipping', 'delivered']),
                    'created_at' => $faker->dateTimeBetween('-6 months', 'now'),
                    'updated_at' => now()
                ]);

                // Добавляем от 1 до 5 товаров в заказ
                $orderProducts = $products->random(rand(1, 5));
                $total = 0;

                foreach ($orderProducts as $product) {
                    $quantity = rand(1, 3);
                    $price = $product->price;
                    $subtotal = $price * $quantity;
                    $total += $subtotal;

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'price' => $price,
                        'subtotal' => $subtotal
                    ]);
                }

                // Обновляем общую сумму заказа
                $order->update([
                    'total_amount' => $total
                ]);

                // Если заказ оплачен, добавляем дату оплаты
                if ($order->payment_status === 'paid') {
                    $order->update([
                        'paid_at' => $faker->dateTimeBetween($order->created_at, 'now')
                    ]);
                }

                // Если заказ доставлен, добавляем даты отправки и доставки
                if ($order->delivery_status === 'delivered') {
                    $shipped_at = $faker->dateTimeBetween($order->created_at, 'now');
                    $order->update([
                        'shipped_at' => $shipped_at,
                        'delivered_at' => $faker->dateTimeBetween($shipped_at, 'now')
                    ]);
                }
            }
        }
    }
} 