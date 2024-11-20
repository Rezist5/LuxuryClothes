<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OrderStatusChanged extends Notification
{
    private $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Статус заказа изменен')
            ->line("Статус вашего заказа #{$this->order->id} изменен на {$this->order->status}")
            ->line("Сумма заказа: {$this->order->total_amount} USD")
            ->action('Просмотреть заказ', url("/orders/{$this->order->id}"));
    }

    public function toArray($notifiable)
    {
        return [
            'order_id' => $this->order->id,
            'status' => $this->order->status,
            'message' => "Статус заказа #{$this->order->id} изменен на {$this->order->status}",
        ];
    }
} 