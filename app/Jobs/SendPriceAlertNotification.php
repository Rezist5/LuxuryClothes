<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Product;
use App\Notifications\PriceDropped;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendPriceAlertNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $product;
    protected $oldPrice;
    protected $newPrice;

    public function __construct(User $user, Product $product, $oldPrice, $newPrice)
    {
        $this->user = $user;
        $this->product = $product;
        $this->oldPrice = $oldPrice;
        $this->newPrice = $newPrice;
    }

    public function handle()
    {
        $this->user->notify(new PriceDropped(
            $this->product,
            $this->oldPrice,
            $this->newPrice
        ));
    }
} 