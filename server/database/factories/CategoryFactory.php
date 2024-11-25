<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition()
    {
        $name = $this->faker->unique()->words(2, true);
        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'gender' => $this->faker->randomElement(['men', 'women', 'unisex']),
            'description' => $this->faker->paragraph(),
            'image_path' => $this->faker->imageUrl(640, 480, 'fashion')
        ];
    }
} 