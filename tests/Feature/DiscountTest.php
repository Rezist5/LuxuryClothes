<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Discount;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DiscountTest extends TestCase
{
    use RefreshDatabase;

    private $admin;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->admin = User::factory()->create(['role' => 'admin']);
    }

    public function test_admin_can_create_discount()
    {
        $discountData = [
            'code' => 'SUMMER2024',
            'type' => 'percentage',
            'value' => 20,
            'starts_at' => now()->toDateTimeString(),
            'ends_at' => now()->addDays(30)->toDateTimeString(),
            'usage_limit' => 100,
            'is_active' => true
        ];

        $response = $this->actingAs($this->admin)
            ->postJson('/api/discounts', $discountData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'code',
                'type',
                'value'
            ]);
    }

    public function test_can_verify_valid_discount()
    {
        $discount = Discount::factory()->create([
            'type' => 'percentage',
            'value' => 20,
            'is_active' => true
        ]);

        $response = $this->postJson('/api/discounts/verify', [
            'code' => $discount->code,
            'amount' => 100
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'discount_amount' => 20,
                'final_amount' => 80
            ]);
    }

    public function test_cannot_verify_expired_discount()
    {
        $discount = Discount::factory()
            ->expired()
            ->create();

        $response = $this->postJson('/api/discounts/verify', [
            'code' => $discount->code,
            'amount' => 100
        ]);

        $response->assertStatus(400);
    }

    public function test_cannot_verify_inactive_discount()
    {
        $discount = Discount::factory()->create([
            'is_active' => false
        ]);

        $response = $this->postJson('/api/discounts/verify', [
            'code' => $discount->code,
            'amount' => 100
        ]);

        $response->assertStatus(400);
    }
} 