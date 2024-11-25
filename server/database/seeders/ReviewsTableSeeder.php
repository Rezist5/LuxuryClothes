<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Product;
use App\Models\User;

class ReviewsTableSeeder extends Seeder
{
    public function run()
    {
        $users = User::where('role', 'user')->get();
        $products = Product::all();

        foreach ($products as $product) {
            // Создаем 0-3 отзыва для каждого продукта
            $reviewsCount = rand(0, 3);
            
            for ($i = 0; $i < $reviewsCount; $i++) {
                Review::create([
                    'user_id' => $users->random()->id,
                    'product_id' => $product->id,
                    'rating' => rand(3, 5), // Рейтинг от 3 до 5
                    'comment' => fake()->paragraph(),
                    'created_at' => fake()->dateTimeBetween('-3 months', 'now')
                ]);
            }
        }
    }
} 