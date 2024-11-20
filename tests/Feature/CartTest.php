<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CartTest extends TestCase
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

    public function test_user_can_view_cart()
    {
        CartItem::factory()->count(3)->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/cart');

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'product' => [
                        'id',
                        'name',
                        'price',
                        'images'
                    ]
                ]
            ]);
    }

    public function test_user_can_add_to_cart()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/cart', [
                'product_id' => $this->product->id
            ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('cart_items', [
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);
    }

    public function test_user_cannot_add_same_product_twice()
    {
        CartItem::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->actingAs($this->user)
            ->postJson('/api/cart', [
                'product_id' => $this->product->id
            ]);

        $response->assertStatus(400);
    }

    public function test_user_can_remove_from_cart()
    {
        $cartItem = CartItem::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/cart/{$cartItem->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('cart_items', [
            'id' => $cartItem->id
        ]);
    }
} 