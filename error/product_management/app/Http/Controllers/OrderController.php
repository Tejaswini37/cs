<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function place()
    {
        $cartItems = Cart::with('product')
                        ->where('user_id', Auth::id())
                        ->get();

        // Check if cart is empty
        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Cart is empty'
            ], 400);
        }

        $total= $cartItems->sum(function ($item) {
                return $item->product->price * $item->quantity;
            });

        // create order
        $order = Order::create([
                'user_id'      => Auth::id(),
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'total_amount' => $total,
                'status'       => 'pending'
            ]);
        
        // add order items
        foreach ($cartItems as $item) {

                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $item->product_id,
                    'price'      => $item->product->price,
                    'quantity'   => $item->quantity,
                    'subtotal'   => $item->product->price * $item->quantity
                ]);

                // Reduce stock
                $item->product->decrement('stock', $item->quantity);
            }

             // Clear cart
            Cart::where('user_id', Auth::id())->delete();
            return response()->json([
                'message' => 'Order placed successfully',
                'order'   => $order
            ], 201);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function myOrders()
    {
        $orders = Order::with('items.product')
                    ->where('user_id', Auth::id())
                    ->latest('id')
                    ->get();

        return response()->json($orders);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    // GET /api/admin/orders
    // Admin views all orders
    // public function adminIndex()
    // {
    //     $orders = Order::with(['items.product','user'])
    //                 ->latest('id')
    //                 ->get();

    //     return response()->json($orders);
    // }
}
