<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\CartItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    private $user;
    private $product;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
        $this->product = Product::factory()->create([
            'status' => 'active',
            'price' => 100
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function test_user_can_view_orders()
    {
        Order::factory()
            ->count(3)
            ->for($this->user)
            ->create();

        $response = $this->actingAs($this->user)
            ->getJson('/api/orders');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'total_amount',
                        'status',
                        'items'
                    ]
                ]
            ]);
    }

    public function test_user_can_create_order()
    {
        CartItem::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->actingAs($this->user)
            ->postJson('/api/orders', [
                'shipping_address' => '123 Test St, City, Country'
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'order' => [
                    'id',
                    'total_amount',
                    'status',
                    'items'
                ],
                'client_secret'
            ]);

        $this->assertDatabaseHas('orders', [
            'user_id' => $this->user->id,
            'total_amount' => 100,
            'shipping_address' => '123 Test St, City, Country'
        ]);

        $this->assertDatabaseEmpty('cart_items');
    }

    public function test_cannot_create_order_with_empty_cart()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/orders', [
                'shipping_address' => '123 Test St, City, Country'
            ]);

        $response->assertStatus(400);
    }

    public function test_webhook_handles_successful_payment()
    {
        $order = Order::factory()->create([
            'payment_status' => 'pending'
        ]);

        $event = [
            'type' => 'payment_intent.succeeded',
            'data' => [
                'object' => [
                    'id' => $order->payment_id
                ]
            ]
        ];

        $response = $this->postJson('/api/webhook/stripe', $event);

        $response->assertStatus(200);
        
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'payment_status' => 'paid',
            'status' => 'processing'
        ]);
    }
} 