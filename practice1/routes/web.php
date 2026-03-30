<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/contact',function(){
    return view('contactpage');
});
Route::get('/about',function(){
    return view('aboutpage');
});
Route::get('/products',function(){
    return view('productspage');
});
