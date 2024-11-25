<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    const GENDER_MALE = 'male';
    const GENDER_FEMALE = 'female';
    const GENDER_UNISEX = 'unisex';

    const TYPE_CLOTHING = 'clothing';
    const TYPE_SHOES = 'shoes';
    const TYPE_ACCESSORIES = 'accessories';
    const TYPE_BAGS = 'bags';
    const TYPE_OTHER = 'other';

    protected $fillable = [
        'name',
        'slug',
        'image',
        'gender',
        'type',
        'parent_id'
    ];

    protected $casts = [
        'image' => 'array'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
} 