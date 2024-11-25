<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'type',
        'value',
        'starts_at',
        'ends_at',
        'usage_limit',
        'used_count',
        'is_active'
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'is_active' => 'boolean',
        'value' => 'decimal:2'
    ];

    public function isValid()
    {
        return $this->is_active &&
            now()->between($this->starts_at, $this->ends_at) &&
            ($this->usage_limit === null || $this->used_count < $this->usage_limit);
    }

    public function calculateDiscount($amount)
    {
        if ($this->type === 'percentage') {
            return $amount * ($this->value / 100);
        }
        return min($this->value, $amount);
    }
} 