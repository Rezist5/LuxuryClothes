<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Discount;

class DiscountPolicy
{
    public function viewAny(User $user)
    {
        return $user->isAdmin();
    }

    public function create(User $user)
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Discount $discount)
    {
        return $user->isAdmin();
    }
} 