<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //  only has created_at so disable
    public $timestamps = false;
//     By default, Laravel automatically manages two columns in database tables:
// created_at
// updated_at

    protected $fillable = [
        'category_id','name','description','price',
        'stock','image_url','status'
    ];

    // each product belongs to one category
    public function category(){
        return $this->belongsTo(Category::class);
    }
    // without this we can't do 
    // $product = Product::find(1);
    // $product->category->name;
}
