<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        $conditions = [
            Product::CONDITION_NEW,
            Product::CONDITION_LIKE_NEW,
            Product::CONDITION_GOOD,
            Product::CONDITION_FAIR
        ];

        $genders = ['men', 'women', 'unisex'];
        $sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraphs(3, true),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'status' => Product::STATUS_ACTIVE,
            'category_id' => Category::factory(),
            'seller_id' => User::factory(),
            'brand' => $this->faker->company(),
            'size' => $this->faker->randomElement($sizes),
            'condition' => $this->faker->randomElement($conditions),
            'color' => $this->faker->safeColorName(),
            'material' => $this->faker->randomElement(['cotton', 'wool', 'polyester', 'leather', 'silk']),
            'style' => $this->faker->randomElement(['casual', 'formal', 'sport', 'vintage']),
            'gender' => $this->faker->randomElement($genders),
            'images' => [
                $this->faker->imageUrl(640, 480, 'clothes'),
                $this->faker->imageUrl(640, 480, 'clothes')
            ],
            'is_featured' => $this->faker->boolean(10),
            'views_count' => $this->faker->numberBetween(0, 1000),
        ];
    }

    public function pending()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => Product::STATUS_PENDING,
            ];
        });
    }

    public function sold()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => Product::STATUS_SOLD,
                'sold_at' => now(),
            ];
        });
    }
} 