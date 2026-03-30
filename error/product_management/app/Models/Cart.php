<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    // Disable timestamps because cart table only has created_at
    public $timestamps = false;

    protected $table='cart';

    // Fields allowed for mass assignment
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity'
    ];

    // Each cart item belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Each cart item belongs to a product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
