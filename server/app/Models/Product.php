<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    const STATUS_ACTIVE = 'active';
    const STATUS_PENDING = 'pending';
    const STATUS_REJECTED = 'rejected';
    const STATUS_SOLD = 'sold';

    const CONDITION_NEW = 'new';
    const CONDITION_LIKE_NEW = 'like_new';
    const CONDITION_GOOD = 'good';
    const CONDITION_FAIR = 'fair';

    protected $fillable = [
        'name',
        'description',
        'price',
        'status',
        'category_id',
        'seller_id',
        'brand',
        'size',
        'condition',
        'color',
        'material',
        'style',
        'gender',
        'images',
        'is_featured',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'images' => 'array',
        'is_featured' => 'boolean',
        'sold_at' => 'datetime',
    ];

    protected $attributes = [
        'views_count' => 0,
        'is_featured' => false,
    ];

    // Отношения
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

    public function orders()
    {
        return $this->hasManyThrough(Order::class, OrderItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Методы
    public function markAsSold()
    {
        $this->update([
            'status' => self::STATUS_SOLD,
            'sold_at' => now()
        ]);
    }

    public function incrementViews()
    {
        $this->increment('views_count');
    }

    public function isAvailable()
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    public function isSold()
    {
        return $this->status === self::STATUS_SOLD;
    }

    public function isPending()
    {
        return $this->status === self::STATUS_PENDING;
    }

    // Скоупы для фильтрации
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    public function scopeByGender($query, $gender)
    {
        return $query->where('gender', $gender);
    }

    public function scopeByCondition($query, $condition)
    {
        return $query->where('condition', $condition);
    }

    public function scopeByPriceRange($query, $min, $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeLatest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    public function scopePopular($query)
    {
        return $query->orderBy('views_count', 'desc');
    }
} 