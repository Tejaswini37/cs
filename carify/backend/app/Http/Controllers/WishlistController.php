<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{

    // GET USER WISHLIST
    public function index(Request $request)
    {
        $items = Wishlist::with("product")
                    ->where("user_id",$request->user()->id)
                    ->get();

        return response()->json($items);
    }


    // TOGGLE WISHLIST
    public function toggle(Request $request)
    {
        $request->validate([
            "product_id"=>"required|exists:products,id"
        ]);

        $exists = Wishlist::where("user_id",$request->user()->id)
                    ->where("product_id",$request->product_id)
                    ->first();

        if($exists){
            $exists->delete();

            return response()->json([
                "status"=>"removed"
            ]);
        }

        Wishlist::create([
            "user_id"=>$request->user()->id,
            "product_id"=>$request->product_id
        ]);

        return response()->json([
            "status"=>"added"
        ]);
    }


    // WISHLIST COUNT
    public function count(Request $request)
    {
        $count = Wishlist::where("user_id",$request->user()->id)->count();

        return response()->json([
            "count"=>$count
        ]);
    }

}