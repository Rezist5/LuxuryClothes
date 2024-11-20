<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Product;

class ProductPolicy
{
    public function update(User $user, Product $product)
    {
        return $user->id === $product->seller_id || $user->isAdmin();
    }

    public function delete(User $user, Product $product)
    {
        return $user->id === $product->seller_id || $user->isAdmin();
    }
} 