<?php

namespace Database\Seeders;

use App\Models\Discount;
use Illuminate\Database\Seeder;

class DiscountSeeder extends Seeder
{
    public function run()
    {
        // Создаем активные скидки
        Discount::factory()->count(5)->create();

        // Создаем истекшие скидки
        Discount::factory()
            ->expired()
            ->count(3)
            ->create();

        // Создаем специальную скидку для тестирования
        Discount::factory()->create([
            'code' => 'WELCOME',
            'type' => 'percentage',
            'value' => 15,
            'starts_at' => now(),
            'ends_at' => now()->addMonths(3),
            'usage_limit' => 100,
        ]);
    }
} 