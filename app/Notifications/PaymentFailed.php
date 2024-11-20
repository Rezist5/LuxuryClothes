<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class PaymentFailed extends Notification
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
            ->error()
            ->subject('Ошибка оплаты заказа')
            ->line("Оплата заказа #{$this->order->id} не удалась.")
            ->line("Сумма заказа: {$this->order->total_amount} USD")
            ->action('Повторить оплату', url("/orders/{$this->order->id}/pay"));
    }

    public function toArray($notifiable)
    {
        return [
            'order_id' => $this->order->id,
            'message' => "Оплата заказа #{$this->order->id} не удалась"
        ];
    }
} 