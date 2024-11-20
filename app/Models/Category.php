<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'parent_id',
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

    public function getFullHierarchyAttribute()
    {
        $hierarchy = [$this->name];
        $parent = $this->parent;

        while ($parent) {
            array_unshift($hierarchy, $parent->name);
            $parent = $parent->parent;
        }

        return implode(' > ', $hierarchy);
    }
} 