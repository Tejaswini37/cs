<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
// use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function dashboard()
    {
         return response()->json([

            // Total products in system
            'total_products' => Product::count(),

            // Active products
            'active_products' => Product::where('status','active')->count(),

            // Products with zero stock
            'out_of_stock' => Product::where('stock',0)->count(),

            // Products with low stock (less than 5)
            'low_stock' => Product::where('stock','<',5)
                                  ->where('stock','>',0)
                                  ->count(),

            // Total customers
            'total_users' => User::where('role','customer')->count(),

            // Total orders placed
            'total_orders' => Order::count(),

            // List of low stock products
            'low_stock_products' => Product::where('stock','<',5)
                                           ->get(['id','name','stock'])

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
}
