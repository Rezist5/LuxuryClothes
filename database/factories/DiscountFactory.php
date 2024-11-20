<?php

namespace Database\Factories;

use App\Models\Discount;
use Illuminate\Database\Eloquent\Factories\Factory;

class DiscountFactory extends Factory
{
    protected $model = Discount::class;

    public function definition()
    {
        return [
            'code' => strtoupper($this->faker->unique()->bothify('????##')),
            'type' => $this->faker->randomElement(['percentage', 'fixed']),
            'value' => $this->faker->numberBetween(5, 50),
            'starts_at' => now(),
            'ends_at' => now()->addDays(30),
            'usage_limit' => $this->faker->optional()->numberBetween(1, 100),
            'used_count' => 0,
            'is_active' => true,
        ];
    }

    public function expired()
    {
        return $this->state(function (array $attributes) {
            return [
                'ends_at' => now()->subDay(),
            ];
        });
    }
} 