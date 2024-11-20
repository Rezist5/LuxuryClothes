<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, Searchable;

    const STATUS_PENDING = 'pending';
    const STATUS_ACTIVE = 'active';
    const STATUS_SOLD = 'sold';
    const STATUS_RESERVED = 'reserved';
    const STATUS_REJECTED = 'rejected';
    const STATUS_HIDDEN = 'hidden';

    protected $fillable = [
        'name',
        'description',
        'price',
        'condition',
        'brand',
        'size',
        'category_id',
        'seller_id',
        'status',
        'rejection_reason',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'brand' => $this->brand,
            'category_name' => $this->category->name,
        ];
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function priceAlerts()
    {
        return $this->hasMany(PriceAlert::class);
    }

    public function getAverageRatingAttribute()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    public function getReviewsCountAttribute()
    {
        return $this->reviews()->count();
    }

    public function isAvailable()
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    public function isReserved()
    {
        return $this->status === self::STATUS_RESERVED;
    }

    public function reserve()
    {
        if (!$this->isAvailable()) {
            throw new \Exception('Товар недоступен для покупки');
        }
        
        return $this->update(['status' => self::STATUS_RESERVED]);
    }

    public function release()
    {
        if ($this->isReserved()) {
            return $this->update(['status' => self::STATUS_ACTIVE]);
        }
    }
} 