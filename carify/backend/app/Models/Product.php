<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    protected $fillable = [
        "name",
        "description",
        "price",
        "stock",
        "image",
        "status",
        "is_featured",
        "category_id"
    ];
    // Scope for active products
    public function scopeActive($query)
    {
        return $query->where("status", true);
    }

    // Scope for featured products
    public function scopeFeatured($query)
    {
        return $query->where("is_featured", true);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }
}
