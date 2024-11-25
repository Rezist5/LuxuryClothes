<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        $sellers = User::whereDoesntHave('products')->take(5)->get();
        if ($sellers->count() < 5) {
            $additionalSellers = User::factory()->count(5 - $sellers->count())->create();
            $sellers = $sellers->concat($additionalSellers);
        }

        // Массив реальных фотографий одежды
        $clothingImages = [
            't-shirts-and-tops' => [
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
                'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
                'https://images.unsplash.com/photo-1562157873-818bc0726f68',
            ],
            'jeans' => [
                'https://images.unsplash.com/photo-1542272604-787c3835535d',
                'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
                'https://images.unsplash.com/photo-1582552938357-32b906df40cb',
            ],
            'dresses' => [
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
                'https://images.unsplash.com/photo-1612336307429-8a898d10e223',
                'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b',
            ],
            'outerwear' => [
                'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543',
                'https://images.unsplash.com/photo-1545594861-3bef43ff2fc8',
                'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
            ],
            'sweaters' => [
                'https://images.unsplash.com/photo-1631541909061-71e349d1a362',
                'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
                'https://images.unsplash.com/photo-1584670747417-594a9412fba5',
            ],
            'shirts' => [
                'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
                'https://images.unsplash.com/photo-1598032895397-b9472444bf93',
                'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176',
            ],
            'pants' => [
                'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
                'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
            ],
            'skirts' => [
                'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
                'https://images.unsplash.com/photo-1577900232427-18219b9166a0',
                'https://images.unsplash.com/photo-1592301933927-35b597393c0a',
            ],
            'accessories' => [
                'https://images.unsplash.com/photo-1611923134239-b9be5816e23d',
                'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7',
                'https://images.unsplash.com/photo-1617038220319-276d3cfab638',
            ],
            'shoes' => [
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
                'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
                'https://images.unsplash.com/photo-1549298916-b41d501d3772',
            ],
        ];

        Category::all()->each(function ($category) use ($sellers, $clothingImages) {
            $productsCount = rand(5, 10);
            
            for ($i = 0; $i < $productsCount; $i++) {
                $brands = ['Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Prada', 'Uniqlo', 'Levi\'s', 'Tommy Hilfiger'];
                $brand = $brands[array_rand($brands)];
                
                $priceRanges = [
                    't-shirts-and-tops' => [15, 200],
                    'jeans' => [50, 300],
                    'dresses' => [80, 1000],
                    'outerwear' => [100, 2000],
                    'sweaters' => [40, 500],
                    'shirts' => [30, 400],
                    'pants' => [40, 500],
                    'skirts' => [30, 400],
                    'accessories' => [20, 1000],
                    'shoes' => [50, 1000]
                ];

                $premiumBrands = ['Gucci', 'Prada'];
                $range = $priceRanges[$category->slug] ?? [20, 200];
                if (in_array($brand, $premiumBrands)) {
                    $range = [$range[0] * 3, $range[1] * 3];
                }

                // Получаем случайные изображения для категории
                $categoryImages = $clothingImages[$category->slug] ?? $clothingImages['accessories'];
                $randomImages = array_rand(array_flip($categoryImages), 2);
                
                Product::create([
                    'name' => $brand . ' ' . $category->name . ' ' . ucfirst(fake()->word()),
                    'description' => fake()->paragraphs(3, true),
                    'price' => fake()->randomFloat(2, $range[0], $range[1]),
                    'status' => Product::STATUS_ACTIVE,
                    'category_id' => $category->id,
                    'seller_id' => $sellers->random()->id,
                    'brand' => $brand,
                    'size' => fake()->randomElement(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
                    'condition' => fake()->randomElement([
                        Product::CONDITION_NEW,
                        Product::CONDITION_LIKE_NEW,
                        Product::CONDITION_GOOD,
                        Product::CONDITION_FAIR
                    ]),
                    'color' => fake()->randomElement(['black', 'white', 'red', 'blue', 'green', 'yellow', 'pink', 'gray', 'brown']),
                    'material' => fake()->randomElement(['cotton', 'wool', 'polyester', 'leather', 'silk', 'denim', 'linen']),
                    'style' => fake()->randomElement(['casual', 'formal', 'sport', 'vintage', 'streetwear', 'business']),
                    'gender' => $category->gender,
                    'images' => $randomImages,
                    'is_featured' => fake()->boolean(30),
                    'views_count' => fake()->numberBetween(0, 1000),
                ]);
            }
        });
    }
} 