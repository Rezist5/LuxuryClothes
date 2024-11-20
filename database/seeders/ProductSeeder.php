<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Tag;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $categories = Category::all();
        $sellers = User::where('role', 'user')->get();
        $tags = Tag::all();

        // Создаем 50 продуктов
        Product::factory()
            ->count(50)
            ->sequence(fn ($sequence) => [
                'category_id' => $categories->random()->id,
                'seller_id' => $sellers->random()->id,
            ])
            ->has(ProductImage::factory()->count(3))
            ->create()
            ->each(function ($product) use ($tags) {
                // Добавляем случайные теги к продукту
                $product->tags()->attach(
                    $tags->random(rand(2, 4))->pluck('id')->toArray()
                );
            });
    }
} 