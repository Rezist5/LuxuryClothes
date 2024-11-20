<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    private $user;
    private $admin;
    private $category;

    protected function setUp(): void
    {
        parent::setUp();
        
        Storage::fake('public');
        
        $this->user = User::factory()->create();
        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->category = Category::factory()->create();
    }

    public function test_can_view_products_list()
    {
        Product::factory()->count(5)->create([
            'status' => 'active'
        ]);

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'price',
                        'images',
                        'category'
                    ]
                ],
                'current_page',
                'last_page'
            ]);
    }

    public function test_can_view_single_product()
    {
        $product = Product::factory()
            ->has(ProductImage::factory()->count(3))
            ->create(['status' => 'active']);

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'id',
                'name',
                'description',
                'price',
                'images',
                'category',
                'seller' => ['id', 'name']
            ]);
    }

    public function test_user_can_create_product()
    {
        $productData = [
            'name' => 'Test Product',
            'description' => 'Test Description',
            'price' => 100.00,
            'condition' => 'new',
            'brand' => 'Test Brand',
            'size' => 'M',
            'category_id' => $this->category->id,
            'images' => [
                UploadedFile::fake()->image('product1.jpg'),
                UploadedFile::fake()->image('product2.jpg'),
            ]
        ];

        $response = $this->actingAs($this->user)
            ->postJson('/api/products', $productData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'name',
                'images' => [
                    '*' => ['id', 'image_path', 'is_primary']
                ]
            ]);

        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'seller_id' => $this->user->id,
            'status' => 'pending'
        ]);
    }

    public function test_user_can_update_own_product()
    {
        $product = Product::factory()->create([
            'seller_id' => $this->user->id
        ]);

        $response = $this->actingAs($this->user)
            ->putJson("/api/products/{$product->id}", [
                'name' => 'Updated Name',
                'description' => 'Updated Description',
                'price' => 150.00,
                'condition' => 'like_new',
                'brand' => 'Updated Brand',
                'size' => 'L',
                'category_id' => $this->category->id,
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated Name'
        ]);
    }

    public function test_user_cannot_update_others_product()
    {
        $product = Product::factory()->create();

        $response = $this->actingAs($this->user)
            ->putJson("/api/products/{$product->id}", [
                'name' => 'Updated Name'
            ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_moderate_products()
    {
        $product = Product::factory()->create(['status' => 'pending']);

        $response = $this->actingAs($this->admin)
            ->postJson("/api/admin/products/{$product->id}/approve");

        $response->assertStatus(200);
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'status' => 'active'
        ]);
    }
} 