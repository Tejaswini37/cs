<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;

class ProductController extends Controller
{

    // LIST PRODUCTS (Search + Category Filter + Pagination)
    public function index(Request $request)
    {
        $query = Product::with(["category","reviews"])->active();

        // Search by product name
        if ($request->filled("search")) {
            $query->where("name","like","%".$request->search."%");
        }

        // Filter by category
        if ($request->filled("category_id")) {
            $query->where("category_id",$request->category_id);
        }

        return response()->json($query->paginate(12));
    }


    // SHOW SINGLE PRODUCT
    public function show($id)
    {
        $product = Product::with(["category","reviews"])->findOrFail($id);

        return response()->json($product);
    }


    // FEATURED PRODUCTS (Homepage)
    public function featured()
    {
        $products = Product::featured()
                    ->with("category")
                    ->take(8)
                    ->get();

        return response()->json($products);
    }


    // STORE PRODUCT (Admin)
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        // Image Upload
        if ($request->hasFile("image")) {
            $data["image"] = $request->file("image")->store("products","public");
        }

        $product = Product::create($data);

        return response()->json([
            "message" => "Product created successfully",
            "product" => $product
        ],201);
    }


    // UPDATE PRODUCT
    public function update(StoreProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validated();

        // Image Upload
        if ($request->hasFile("image")) {
            $data["image"] = $request->file("image")->store("products","public");
        }

        $product->update($data);

        return response()->json([
            "message" => "Product updated successfully",
            "product" => $product
        ]);
    }


    // DELETE PRODUCT (Soft Delete)
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json([
            "message" => "Product deleted successfully"
        ]);
    }


    // TOGGLE PRODUCT STATUS (active/inactive)
    public function toggleStatus($id)
    {
        $product = Product::findOrFail($id);

        $product->status = !$product->status;

        $product->save();

        return response()->json([
            "message" => "Product status updated",
            "status" => $product->status
        ]);
    }

}