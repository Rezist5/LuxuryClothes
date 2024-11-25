<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $token;
    public $email;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $this->email = $notifiable->getEmailForPasswordReset();
        
        $resetUrl = URL::temporarySignedRoute(
            'password.reset',
            now()->addMinutes(60),
            [
                'token' => $this->token,
                'email' => $this->email,
            ]
        );

        return (new MailMessage)
            ->subject('Сброс пароля')
            ->markdown('emails.reset-password', [
                'resetUrl' => $resetUrl,
                'token' => $this->token,
                'email' => $this->email
            ]);
    }
} 