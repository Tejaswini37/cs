<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    // Disable timestamps because table has only created_at
    public $timestamps = false;

    // Fields allowed for mass assignment
    protected $fillable = [
        'name',
        'status'
    ];

    // One category can have many products
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
