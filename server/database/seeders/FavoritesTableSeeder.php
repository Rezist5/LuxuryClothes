<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class FavoritesTableSeeder extends Seeder
{
    public function run()
    {
        $users = User::where('role', 'user')->get();
        $products = Product::where('status', 'active')->get();

        foreach ($users as $user) {
            // Добавляем 3-7 случайных товаров в избранное
            $favoriteProducts = $products->random(rand(3, 7));
            
            foreach ($favoriteProducts as $product) {
                DB::table('favorites')->insert([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'created_at' => fake()->dateTimeBetween('-3 months', 'now'),
                    'updated_at' => now()
                ]);
            }
        }
    }
} 