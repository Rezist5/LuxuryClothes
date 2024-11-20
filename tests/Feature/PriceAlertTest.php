<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\PriceAlert;
use App\Notifications\PriceDropped;
use Illuminate\Support\Facades\Notification;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PriceAlertTest extends TestCase
{
    use RefreshDatabase;

    private $user;
    private $product;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
        $this->product = Product::factory()->create([
            'price' => 100,
            'status' => 'active'
        ]);
    }

    public function test_user_can_create_price_alert()
    {
        $response = $this->actingAs($this->user)
            ->postJson("/api/products/{$this->product->id}/price-alert", [
                'target_price' => 80
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'target_price',
                'is_active'
            ]);

        $this->assertDatabaseHas('price_alerts', [
            'user_id' => $this->user->id,
            'product_id' => $this->product->id,
            'target_price' => 80
        ]);
    }

    public function test_user_receives_notification_when_price_drops()
    {
        Notification::fake();

        $alert = PriceAlert::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id,
            'target_price' => 80,
            'is_active' => true
        ]);

        $this->product->update(['price' => 75]);

        Notification::assertSentTo(
            $this->user,
            PriceDropped::class,
            function ($notification) {
                return $notification->product->id === $this->product->id;
            }
        );

        $this->assertDatabaseHas('price_alerts', [
            'id' => $alert->id,
            'is_active' => false
        ]);
    }

    public function test_user_can_delete_price_alert()
    {
        $alert = PriceAlert::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/price-alerts/{$alert->id}");

        $response->assertStatus(200);
        
        $this->assertDatabaseMissing('price_alerts', [
            'id' => $alert->id
        ]);
    }
} 