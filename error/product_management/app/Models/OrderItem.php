<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    // Disable timestamps because order_items table has no timestamps
    public $timestamps = false;

    // Fields allowed for mass assignment
    protected $fillable = [
        'order_id',
        'product_id',
        'price',
        'quantity',
        'subtotal'
    ];

    // Each order item belongs to one order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Each order item belongs to one product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
