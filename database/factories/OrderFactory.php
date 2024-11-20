<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'total_amount' => $this->faker->randomFloat(2, 100, 10000),
            'status' => 'pending',
            'payment_id' => $this->faker->uuid,
            'payment_status' => 'pending',
            'shipping_address' => $this->faker->address,
        ];
    }

    public function completed()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'completed',
                'payment_status' => 'paid',
            ];
        });
    }
} 