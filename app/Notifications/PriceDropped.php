<?php

namespace App\Notifications;

use App\Models\Product;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class PriceDropped extends Notification
{
    private $product;
    private $oldPrice;
    private $newPrice;

    public function __construct(Product $product, $oldPrice, $newPrice)
    {
        $this->product = $product;
        $this->oldPrice = $oldPrice;
        $this->newPrice = $newPrice;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Цена на товар снизилась!')
            ->line("Цена на {$this->product->name} снизилась!")
            ->line("Старая цена: {$this->oldPrice}")
            ->line("Новая цена: {$this->newPrice}")
            ->action('Посмотреть товар', url("/products/{$this->product->id}"));
    }

    public function toArray($notifiable)
    {
        return [
            'product_id' => $this->product->id,
            'product_name' => $this->product->name,
            'old_price' => $this->oldPrice,
            'new_price' => $this->newPrice,
        ];
    }
} 