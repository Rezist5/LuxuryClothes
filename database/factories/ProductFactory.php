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
        $conditions = ['new', 'like_new', 'good', 'fair'];
        $brands = ['Gucci', 'Louis Vuitton', 'Prada', 'Chanel', 'Hermès', 'Versace'];
        $sizes = ['XS', 'S', 'M', 'L', 'XL'];

        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraphs(2, true),
            'price' => $this->faker->randomFloat(2, 100, 10000),
            'condition' => $this->faker->randomElement($conditions),
            'brand' => $this->faker->randomElement($brands),
            'size' => $this->faker->randomElement($sizes),
            'category_id' => Category::factory(),
            'seller_id' => User::factory(),
            'status' => 'active',
        ];
    }

    public function pending()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'pending'
            ];
        });
    }

    public function sold()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'sold'
            ];
        });
    }
} 