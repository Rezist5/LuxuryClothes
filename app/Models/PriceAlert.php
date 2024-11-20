<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PriceAlert extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'target_price',
        'is_active'
    ];

    protected $casts = [
        'target_price' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
} 