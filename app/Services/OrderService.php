<?php

namespace App\Services;

use App\Models\Order;
use App\Models\CartItem;
use App\Models\Product;
use App\Exceptions\StripeException;
use Illuminate\Support\Facades\DB;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class OrderService
{
    public function createOrder($userId, $shippingAddress, $discountCode = null)
    {
        return DB::transaction(function () use ($userId, $shippingAddress, $discountCode) {
            $cartItems = CartItem::where('user_id', $userId)
                ->with('product')
                ->get();

            if ($cartItems->isEmpty()) {
                throw new \Exception('Корзина пуста');
            }

            // Проверяем доступность товаров
            foreach ($cartItems as $item) {
                if ($item->product->status !== Product::STATUS_ACTIVE) {
                    throw new \Exception("Товар '{$item->product->name}' недоступен для покупки");
                }
            }

            $totalAmount = $cartItems->sum(function ($item) {
                return $item->product->price;
            });

            // Применяем скидку если есть
            if ($discountCode) {
                $discount = $this->applyDiscount($discountCode, $totalAmount);
                $totalAmount = $discount['final_amount'];
            }

            try {
                Stripe::setApiKey(config('services.stripe.secret'));
                $paymentIntent = PaymentIntent::create([
                    'amount' => (int)($totalAmount * 100),
                    'currency' => 'usd',
                    'metadata' => ['user_id' => $userId]
                ]);

                $order = Order::create([
                    'user_id' => $userId,
                    'total_amount' => $totalAmount,
                    'shipping_address' => $shippingAddress,
                    'payment_id' => $paymentIntent->id,
                    'status' => Order::STATUS_PENDING,
                    'payment_status' => Order::PAYMENT_STATUS_PENDING
                ]);

                // Создаем элементы заказа
                foreach ($cartItems as $item) {
                    $order->items()->create([
                        'product_id' => $item->product_id,
                        'price' => $item->product->price
                    ]);
                }

                // Очищаем корзину
                CartItem::where('user_id', $userId)->delete();

                return [
                    'order' => $order->load('items.product'),
                    'client_secret' => $paymentIntent->client_secret
                ];

            } catch (\Stripe\Exception\ApiErrorException $e) {
                throw new StripeException($e->getMessage());
            }
        });
    }

    private function applyDiscount($code, $amount)
    {
        $discount = Discount::where('code', $code)
            ->where('is_active', true)
            ->first();

        if (!$discount || !$discount->isValid()) {
            throw new \Exception('Недействительный промокод');
        }

        $discountAmount = $discount->calculateDiscount($amount);

        return [
            'discount_amount' => $discountAmount,
            'final_amount' => $amount - $discountAmount
        ];
    }
} 