<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\Cart;
use App\Models\Product;

class OrderController extends Controller
{

    // PLACE ORDER
    public function placeOrder(Request $request)
    {
        $request->validate([
            "address_id"=>"required|exists:addresses,id"
        ]);

        $cartItems = Cart::with("product")
                    ->where("user_id",$request->user()->id)
                    ->get();

        if($cartItems->isEmpty()){
            return response()->json([
                "message"=>"Cart is empty"
            ],422);
        }

        try{

            $order = DB::transaction(function() use ($request,$cartItems){

                $total = 0;
                $orderItems = [];

                foreach($cartItems as $item){

                    $product = Product::lockForUpdate()
                                ->find($item->product_id);

                    if($product->stock < $item->quantity){
                        throw new \Exception(
                            "Insufficient stock for ".$product->name
                        );
                    }

                    $total += $product->price * $item->quantity;

                    $orderItems[] = [
                        "product_id"=>$product->id,
                        "quantity"=>$item->quantity,
                        "price"=>$product->price
                    ];

                    $product->decrement("stock",$item->quantity);
                }

                $order = Order::create([
                    "user_id"=>$request->user()->id,
                    "address_id"=>$request->address_id,
                    "total_amount"=>$total,
                    "status"=>"confirmed",
                    "payment_status"=>"paid"
                ]);

                $order->orderItems()->createMany($orderItems);

                Cart::where("user_id",$request->user()->id)->delete();

                return $order;

            });

            return response()->json([
                "message"=>"Order placed!",
                "order"=>$order
            ],201);

        }
        catch(\Exception $e){

            return response()->json([
                "message"=>$e->getMessage()
            ],422);

        }

    }


    // ADMIN UPDATE STATUS
    public function updateStatus(Request $request,$id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            "status"=>"required|in:pending,confirmed,processing,shipped,delivered,cancelled"
        ]);

        $order->update([
            "status"=>$request->status
        ]);

        return response()->json($order);
    }


    // USER CANCEL ORDER
    public function cancelOrder(Request $request,$id)
    {
        $order = Order::where("user_id",$request->user()->id)
                    ->findOrFail($id);

        if(!in_array($order->status,["pending","confirmed"])){
            return response()->json([
                "message"=>"Cannot cancel at this stage"
            ],422);
        }

        $order->update([
            "status"=>"cancelled"
        ]);

        return response()->json([
            "message"=>"Order cancelled"
        ]);
    }

}