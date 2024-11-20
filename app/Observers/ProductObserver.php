<?php

namespace App\Observers;

use App\Models\Product;
use App\Models\PriceAlert;
use App\Notifications\PriceDropped;
use Illuminate\Support\Facades\Log;

class ProductObserver
{
    public function updating(Product $product)
    {
        // Проверяем изменение статуса
        if ($product->isDirty('status')) {
            if ($product->status === Product::STATUS_SOLD) {
                // Удаляем товар из всех корзин
                $product->cartItems()->delete();
                // Деактивируем все уведомления о цене
                $product->priceAlerts()->update(['is_active' => false]);
            }
        }
    }

    public function updated(Product $product)
    {
        try {
            // Проверяем снижение цены
            if ($product->isDirty('price') && 
                $product->price < $product->getOriginal('price') && 
                $product->status === Product::STATUS_ACTIVE) {
                
                $alerts = PriceAlert::where('product_id', $product->id)
                    ->where('is_active', true)
                    ->where('target_price', '>=', $product->price)
                    ->with('user')
                    ->get();

                foreach ($alerts as $alert) {
                    $alert->user->notify(new PriceDropped(
                        $product,
                        $product->getOriginal('price'),
                        $product->price
                    ));
                    $alert->update(['is_active' => false]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Error in ProductObserver: ' . $e->getMessage());
        }
    }

    public function deleted(Product $product)
    {
        try {
            // Удаляем все связанные изображения
            foreach ($product->images as $image) {
                $image->delete();
            }
        } catch (\Exception $e) {
            Log::error('Error deleting product images: ' . $e->getMessage());
        }
    }
} 