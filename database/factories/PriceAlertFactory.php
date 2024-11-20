<?php

namespace Database\Factories;

use App\Models\PriceAlert;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class PriceAlertFactory extends Factory
{
    protected $model = PriceAlert::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'product_id' => Product::factory(),
            'target_price' => $this->faker->randomFloat(2, 50, 5000),
            'is_active' => true,
        ];
    }
} 