<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\Review;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReviewTest extends TestCase
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

    public function test_user_can_view_product_reviews()
    {
        Review::factory(3)->create([
            'product_id' => $this->product->id
        ]);

        $response = $this->getJson("/api/products/{$this->product->id}/reviews");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'reviews' => [
                    'data',
                    'current_page',
                    'last_page'
                ],
                'average_rating',
                'reviews_count'
            ]);
    }

    public function test_user_cannot_review_without_purchase()
    {
        $response = $this->actingAs($this->user)
            ->postJson("/api/products/{$this->product->id}/reviews", [
                'rating' => 5,
                'comment' => 'Great product!'
            ]);

        $response->assertStatus(403);
    }

    public function test_user_can_review_after_purchase()
    {
        // Создаем заказ
        $order = Order::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'completed'
        ]);

        OrderItem::factory()->create([
            'order_id' => $order->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->actingAs($this->user)
            ->postJson("/api/products/{$this->product->id}/reviews", [
                'rating' => 5,
                'comment' => 'Great product!'
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'rating',
                'comment',
                'user' => ['id', 'name']
            ]);
    }

    public function test_user_cannot_review_same_product_twice()
    {
        // Создаем заказ и отзыв
        $order = Order::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'completed'
        ]);

        OrderItem::factory()->create([
            'order_id' => $order->id,
            'product_id' => $this->product->id
        ]);

        Review::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->actingAs($this->user)
            ->postJson("/api/products/{$this->product->id}/reviews", [
                'rating' => 4,
                'comment' => 'Another review'
            ]);

        $response->assertStatus(400);
    }
} 