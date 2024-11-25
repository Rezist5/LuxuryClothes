<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'T-Shirts & Tops',
                'slug' => 't-shirts-and-tops',
                'gender' => Category::GENDER_UNISEX,
                'description' => 'Стильные футболки и топы для повседневной носки',
                'image_path' => 'categories/t-shirts.jpg'
            ],
            [
                'name' => 'Джинсы',
                'slug' => 'jeans',
                'gender' => Category::GENDER_UNISEX,
                'description' => 'Джинсы всех стилей и фасонов',
                'image_path' => 'categories/jeans.jpg'
            ],
            [
                'name' => 'Платья',
                'slug' => 'dresses',
                'gender' => Category::GENDER_FEMALE,
                'description' => 'Платья для любого случая',
                'image_path' => 'categories/dresses.jpg'
            ],
            [
                'name' => 'Верхняя одежда',
                'slug' => 'outerwear',
                'gender' => Category::GENDER_UNISEX,
                'description' => 'Куртки, пальто и другая верхняя одежда',
                'image_path' => 'categories/outerwear.jpg'
            ],
            [
                'name' => 'Свитера и кардиганы',
                'slug' => 'sweaters',
                'gender' => Category::GENDER_UNISEX,
                'description' => 'Теплые свитера и стильные кардиганы',
                'image_path' => 'categories/sweaters.jpg'
            ],
            [
                'name' => 'Рубашки',
                'slug' => 'shirts',
                'gender' => Category::GENDER_UNISEX,
                'description' => 'Классические и повседневные рубашки',
                'image_path' => 'categories/shirts.jpg'
            ],
            [
                'name' => 'Брюки',
                'slug' => 'pants',
                'gender' => Category::GENDER_UNISEX,
                'description' => 'Брюки и штаны всех фасонов',
                'image_path' => 'categories/pants.jpg'
            ],
            [
                'name' => 'Юбки',
                'slug' => 'skirts',
                'gender' => Category::GENDER_FEMALE,
                'description' => 'Юбки разной длины и стилей',
                'image_path' => 'categories/skirts.jpg'
            ],
            [
                'name' => 'Аксессуары',
                'slug' => 'accessories',
                'gender' => Category::GENDER_UNISEX,
                'description' => 'Сумки, ремни, шарфы и другие аксессуары',
                'image_path' => 'categories/accessories.jpg'
            ],
            [
                'name' => 'Обувь',
                'slug' => 'shoes',
                'gender' => Category::GENDER_UNISEX,
                'description' => 'Разнообразная обувь на любой сезон',
                'image_path' => 'categories/shoes.jpg'
            ]
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['slug' => $category['slug']], // Проверяем по slug
                $category
            );
        }
    }
} 