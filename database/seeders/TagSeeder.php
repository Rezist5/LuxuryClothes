<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    public function run()
    {
        $tags = [
            'Винтаж',
            'Люкс',
            'Распродажа',
            'Новинка',
            'Лимитированная серия',
            'Эксклюзив',
            'Ретро',
            'Классика',
            'Тренд',
            'Унисекс',
        ];

        foreach ($tags as $tagName) {
            Tag::create([
                'name' => $tagName,
                'slug' => Str::slug($tagName),
            ]);
        }
    }
} 