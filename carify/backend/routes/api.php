<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReviewController;

use App\Http\Controllers\AddressController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\OrderController;

//public routes
Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
Route::get("/products", [ProductController::class, "index"]);
Route::get("/products/{id}", [ProductController::class, "show"]);
Route::get("/products/featured", [ProductController::class, "featured"]);
Route::get("/categories",[CategoryController::class,"index"]);
Route::get("/products/{id}/reviews",[ReviewController::class,"index"]);

//protected routes
Route::middleware("auth:sanctum")->group(function () {
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::get("/cart",[CartController::class,"index"]);
    Route::post("/cart",[CartController::class,"addToCart"]);
    Route::put("/cart/{productId}",[CartController::class,"update"]);
    Route::delete("/cart/{productId}",[CartController::class,"destroy"]);
    Route::get("/addresses",[AddressController::class,"index"]);
    Route::post("/addresses",[AddressController::class,"store"]);
    Route::put("/addresses/{id}",[AddressController::class,"update"]);
    Route::delete("/addresses/{id}",[AddressController::class,"destroy"]);
    Route::post("/orders/place",[OrderController::class,"placeOrder"]);
    Route::post("/orders/{id}/cancel",[OrderController::class,"cancelOrder"]);
    Route::post("/reviews",[ReviewController::class,"store"]);
    Route::get("/wishlist",[WishlistController::class,"index"]);
    Route::post("/wishlist/toggle",[WishlistController::class,"toggle"]);
    Route::get("/wishlist/count",[WishlistController::class,"count"]);
});

// admin only
Route::middleware(["auth:sanctum", "admin"])->group(function () {
    Route::post("/products", [ProductController::class, "store"]);
    Route::put("/products/{id}", [ProductController::class, "update"]);
    Route::delete("/products/{id}", [ProductController::class, "destroy"]);
    Route::patch("/products/{id}/toggle-status", [ProductController::class, "toggleStatus"]);
    Route::post("/categories",[CategoryController::class,"store"]);
    Route::put("/categories/{id}",[CategoryController::class,"update"]);
    Route::delete("/categories/{id}",[CategoryController::class,"destroy"]);
    Route::patch("/orders/{id}/status",[OrderController::class,"updateStatus"]);
     Route::delete("/reviews/{id}",[ReviewController::class,"destroy"]);
});
