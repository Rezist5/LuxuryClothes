<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CartItem;
use App\Models\User;
use App\Models\Product;

class CartItemsTableSeeder extends Seeder
{
    public function run()
    {
        // Получаем обычных пользователей (не админов)
        $users = User::where('role', 'user')->take(3)->get();
        
        // Получаем активные продукты
        $products = Product::where('status', 'active')->get();

        foreach ($users as $user) {
            // Добавляем 2-4 случайных товара в корзину каждому пользователю
            $randomProducts = $products->random(rand(2, 4));
            
            foreach ($randomProducts as $product) {
                CartItem::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'quantity' => rand(1, 3)
                ]);
            }
        }
    }
} 