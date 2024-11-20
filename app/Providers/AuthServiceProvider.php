<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Review::class => ReviewPolicy::class,
        Tag::class => TagPolicy::class,
        Discount::class => DiscountPolicy::class,
        PriceAlert::class => PriceAlertPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();
    }
} 