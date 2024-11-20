<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_categories()
    {
        Category::factory()
            ->count(3)
            ->has(Category::factory()->count(2), 'children')
            ->create();

        $response = $this->getJson('/api/categories');

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'name',
                    'slug',
                    'children' => [
                        '*' => [
                            'id',
                            'name',
                            'slug'
                        ]
                    ]
                ]
            ]);
    }

    public function test_can_view_category_with_products()
    {
        $category = Category::factory()->create();
        
        Product::factory()
            ->count(5)
            ->create([
                'category_id' => $category->id,
                'status' => 'active'
            ]);

        $response = $this->getJson("/api/categories/{$category->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'id',
                'name',
                'slug',
                'products' => [
                    'data' => [
                        '*' => [
                            'id',
                            'name',
                            'price',
                            'images'
                        ]
                    ]
                ]
            ]);
    }
} 