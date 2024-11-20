<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Tag;

class TagPolicy
{
    public function create(User $user)
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Tag $tag)
    {
        return $user->isAdmin();
    }
} 