<?php

namespace App\Policies;

use App\Models\User;
use App\Models\PriceAlert;

class PriceAlertPolicy
{
    public function delete(User $user, PriceAlert $alert)
    {
        return $user->id === $alert->user_id;
    }
} 