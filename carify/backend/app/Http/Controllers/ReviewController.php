<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class ReviewController extends Controller
{

    // LIST PRODUCT REVIEWS
    public function index($id)
    {
        $reviews = Review::with("user")
                    ->where("product_id",$id)
                    ->latest()
                    ->get();

        return response()->json($reviews);
    }


    // STORE REVIEW
    public function store(Request $request)
    {
        $request->validate([
            "product_id" => "required|exists:products,id",
            "rating" => "required|integer|min:1|max:5",
            "comment" => "nullable|string|max:1000",
        ]);

        // CHECK VERIFIED BUYER
        $hasBought = OrderItem::whereHas("order", function($q) use ($request){
            $q->where("user_id",$request->user()->id)
              ->whereIn("status",["delivered","shipped"]);
        })
        ->where("product_id",$request->product_id)
        ->exists();

        if(!$hasBought){
            return response()->json([
                "message"=>"Only buyers can review"
            ],403);
        }

        // ONE REVIEW PER USER PER PRODUCT
        $review = Review::updateOrCreate(
            [
                "user_id"=>$request->user()->id,
                "product_id"=>$request->product_id
            ],
            [
                "rating"=>$request->rating,
                "comment"=>$request->comment
            ]
        );

        return response()->json($review,201);
    }


    // ADMIN DELETE REVIEW
    public function destroy($id)
    {
        Review::findOrFail($id)->delete();

        return response()->json([
            "message"=>"Review deleted"
        ]);
    }

}