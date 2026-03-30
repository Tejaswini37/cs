<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{

    // GET USER CART
    public function index(Request $request)
    {
        $cart = Cart::with("product.category")
                ->where("user_id",$request->user()->id)
                ->get();

        return response()->json($cart);
    }


    // ADD TO CART
    public function addToCart(Request $request)
    {
        $request->validate([
            "product_id" => "required|exists:products,id",
            "quantity" => "required|integer|min:1"
        ]);

        $cart = Cart::updateOrCreate(
            [
                "user_id"=>$request->user()->id,
                "product_id"=>$request->product_id
            ],
            [
                "quantity"=>$request->quantity
            ]
        );

        return response()->json($cart,201);
    }


    // UPDATE CART QUANTITY
    public function update(Request $request,$productId)
    {
        $request->validate([
            "quantity"=>"required|integer|min:1"
        ]);

        $cart = Cart::where("user_id",$request->user()->id)
                    ->where("product_id",$productId)
                    ->firstOrFail();

        $cart->update([
            "quantity"=>$request->quantity
        ]);

        return response()->json($cart);
    }


    // REMOVE FROM CART
    public function destroy(Request $request,$productId)
    {
        Cart::where("user_id",$request->user()->id)
            ->where("product_id",$productId)
            ->delete();

        return response()->json([
            "message"=>"Removed from cart"
        ]);
    }

}