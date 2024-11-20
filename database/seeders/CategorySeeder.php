<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $mainCategories = [
            'Одежда' => [
                'Платья',
                'Костюмы',
                'Верхняя одежда',
                'Брюки',
                'Юбки',
                'Рубашки и блузы',
            ],
            'Обувь' => [
                'Туфли',
                'Ботинки',
                'Кроссовки',
                'Сандалии',
            ],
            'Аксессуары' => [
                'Сумки',
                'Украшения',
                'Часы',
                'Ремни',
                'Очки',
            ],
        ];

        foreach ($mainCategories as $mainName => $subCategories) {
            $mainCategory = Category::create([
                'name' => $mainName,
                'slug' => Str::slug($mainName),
            ]);

            foreach ($subCategories as $subName) {
                Category::create([
                    'name' => $subName,
                    'slug' => Str::slug($subName),
                    'parent_id' => $mainCategory->id,
                ]);
            }
        }
    }
} 