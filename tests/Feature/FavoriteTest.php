<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\Favorite;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FavoriteTest extends TestCase
{
    use RefreshDatabase;

    private $user;
    private $product;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
        $this->product = Product::factory()->create(['status' => 'active']);
    }

    public function test_user_can_view_favorites()
    {
        Favorite::factory()
            ->count(3)
            ->create([
                'user_id' => $this->user->id
            ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/favorites');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'price',
                        'images'
                    ]
                ]
            ]);
    }

    public function test_user_can_add_to_favorites()
    {
        $response = $this->actingAs($this->user)
            ->postJson("/api/products/{$this->product->id}/favorite");

        $response->assertStatus(201);

        $this->assertDatabaseHas('favorites', [
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);
    }

    public function test_user_cannot_add_same_product_twice_to_favorites()
    {
        Favorite::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->actingAs($this->user)
            ->postJson("/api/products/{$this->product->id}/favorite");

        $response->assertStatus(400);
    }

    public function test_user_can_remove_from_favorites()
    {
        $favorite = Favorite::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/products/{$this->product->id}/favorite");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('favorites', [
            'id' => $favorite->id
        ]);
    }
} 