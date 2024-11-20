<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Tag;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TagTest extends TestCase
{
    use RefreshDatabase;

    private $admin;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->admin = User::factory()->create(['role' => 'admin']);
    }

    public function test_can_list_tags()
    {
        Tag::factory()->count(5)->create();

        $response = $this->getJson('/api/tags');

        $response->assertStatus(200)
            ->assertJsonCount(5);
    }

    public function test_can_view_products_by_tag()
    {
        $tag = Tag::factory()->create();
        $products = Product::factory()->count(3)->create(['status' => 'active']);
        
        $tag->products()->attach($products->pluck('id'));

        $response = $this->getJson("/api/tags/{$tag->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'tag',
                'products' => [
                    'data' => [
                        '*' => ['id', 'name', 'price']
                    ]
                ]
            ]);
    }

    public function test_admin_can_create_tag()
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/tags', [
                'name' => 'New Tag'
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['id', 'name', 'slug']);

        $this->assertDatabaseHas('tags', [
            'name' => 'New Tag'
        ]);
    }

    public function test_admin_can_delete_tag()
    {
        $tag = Tag::factory()->create();

        $response = $this->actingAs($this->admin)
            ->deleteJson("/api/tags/{$tag->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('tags', [
            'id' => $tag->id
        ]);
    }
} 