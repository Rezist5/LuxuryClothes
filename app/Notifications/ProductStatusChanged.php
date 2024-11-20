<?php

namespace App\Notifications;

use App\Models\Product;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ProductStatusChanged extends Notification
{
    private $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        $message = (new MailMessage)
            ->subject('Статус товара изменен')
            ->line("Статус вашего товара '{$this->product->name}' изменен на {$this->product->status}");

        if ($this->product->status === Product::STATUS_REJECTED) {
            $message->line("Причина отказа: {$this->product->rejection_reason}");
        }

        return $message;
    }

    public function toArray($notifiable)
    {
        return [
            'product_id' => $this->product->id,
            'status' => $this->product->status,
            'message' => "Статус товара '{$this->product->name}' изменен на {$this->product->status}",
            'rejection_reason' => $this->product->rejection_reason,
        ];
    }
} 