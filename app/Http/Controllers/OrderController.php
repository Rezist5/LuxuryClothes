<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\CartItem;
use App\Notifications\OrderStatusChanged;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Exceptions\StripeException;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', auth()->id())
            ->with(['items.product.images'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
        ]);

        try {
            $cartItems = CartItem::where('user_id', auth()->id())
                ->with('product')
                ->get();

            if ($cartItems->isEmpty()) {
                return response()->json([
                    'message' => 'Корзина пуста'
                ], 400);
            }

            $totalAmount = $cartItems->sum(function ($item) {
                return $item->product->price;
            });

            \DB::beginTransaction();

            // Создаем платеж в Stripe
            Stripe::setApiKey(config('services.stripe.secret'));
            $paymentIntent = PaymentIntent::create([
                'amount' => (int)($totalAmount * 100),
                'currency' => 'usd',
            ]);

            // Создаем заказ
            $order = Order::create([
                'user_id' => auth()->id(),
                'total_amount' => $totalAmount,
                'shipping_address' => $request->shipping_address,
                'payment_id' => $paymentIntent->id,
            ]);

            // Добавляем товары в заказ
            foreach ($cartItems as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'price' => $item->product->price,
                ]);
            }

            // Очищаем корзину
            CartItem::where('user_id', auth()->id())->delete();

            \DB::commit();

            return response()->json([
                'order' => $order->load('items.product'),
                'client_secret' => $paymentIntent->client_secret,
            ], 201);

        } catch (\Exception $e) {
            \DB::rollBack();
            throw new StripeException($e->getMessage());
        }
    }

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                config('services.stripe.webhook_secret')
            );
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        try {
            switch ($event->type) {
                case 'payment_intent.succeeded':
                    $this->handleSuccessfulPayment($event->data->object);
                    break;
                case 'payment_intent.payment_failed':
                    $this->handleFailedPayment($event->data->object);
                    break;
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            \Log::error('Webhook error: ' . $e->getMessage());
            return response()->json(['error' => 'Webhook handling failed'], 500);
        }
    }

    private function handleSuccessfulPayment($paymentIntent)
    {
        \DB::transaction(function () use ($paymentIntent) {
            $order = Order::where('payment_id', $paymentIntent->id)->firstOrFail();
            
            $order->update([
                'payment_status' => 'paid',
                'status' => Order::STATUS_PROCESSING
            ]);

            // Обновляем статус товаров
            foreach ($order->items as $item) {
                $item->product->update(['status' => Product::STATUS_SOLD]);
            }

            // Отправляем уведомление
            $order->user->notify(new OrderStatusChanged($order));
        });
    }

    private function handleFailedPayment($paymentIntent)
    {
        $order = Order::where('payment_id', $paymentIntent->id)->firstOrFail();
        
        $order->update([
            'payment_status' => 'failed',
            'status' => Order::STATUS_CANCELLED
        ]);

        $order->user->notify(new PaymentFailed($order));
    }
} 