<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run()
    {
        $products = Product::all();
        $users = User::where('role', 'user')->get();

        // Создаем случайные отзывы для продуктов
        foreach ($products as $product) {
            $reviewCount = rand(0, 5);
            $randomUsers = $users->random($reviewCount);

            foreach ($randomUsers as $user) {
                Review::factory()->create([
                    'product_id' => $product->id,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
} 