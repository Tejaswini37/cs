<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // Disable timestamps because table has only created_at
    public $timestamps = false;

    // Fields allowed for mass assignment
    protected $fillable = [
        'user_id',
        'order_number',
        'total_amount',
        'status'
    ];

    // Each order belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Each order has many order items
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
