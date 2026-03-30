<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // auth()->id() and Auth::id() are essentially the same in Laravel. Both return the ID of the currently authenticated user.
    public function index()
    {
        $cart = cart::with('product')
            ->where('user_id', Auth::id())
            ->get();
        return response()->json($cart);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1'
        ]);
        $product = Product::findOrFail($request->product_id);

        // if stock is not enough to place order
        if ($product->stock < $request->quantity) {
            return response()->json([
                'message' => 'Insufficient stock'
            ], 400);
        }

        // check if prod already exists in cart
        $cartItem = Cart::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {

            // Increase quantity
            $cartItem->increment('quantity', $request->quantity);
        } else {

            // Create new cart item
            Cart::create([
                'user_id'    => Auth::id(),
                'product_id' => $request->product_id,
                'quantity'   => $request->quantity
            ]);
        }

        return response()->json([
            'message' => 'Product added to cart'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $cartItem = Cart::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $cartItem->update([
            'quantity' => $request->quantity
        ]);

        return response()->json([
            'message' => 'Cart updated',
            'cart' => $cartItem
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function remove($id)
    {
        // Cart::where('id',$id)
        //     ->where('user_id',Auth::id());
        //     ->delete();
        // return response()->json([
        //     'message'=>'Item removed from cart'
        // ]);
        $cart = Cart::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$cart) {
            return response()->json([
                'message' => 'Cart item not found'
            ], 404);
        }

        $cart->delete();

        return response()->json([
            'message' => 'Item removed from cart'
        ]);
    }
}
