<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    // LIST CATEGORIES
    public function index()
    {
        return response()->json(
            Category::withCount("products")->get()
        );
    }

    // CREATE CATEGORY
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "slug" => "required|string|unique:categories,slug",
            "description" => "nullable|string"
        ]);

        $category = Category::create($request->all());

        return response()->json([
            "message" => "Category created",
            "category" => $category
        ],201);
    }

    // UPDATE CATEGORY
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            "name" => "required|string|max:255",
            "slug" => "required|string|unique:categories,slug,".$id,
            "description" => "nullable|string"
        ]);

        $category->update($request->all());

        return response()->json([
            "message" => "Category updated",
            "category" => $category
        ]);
    }

    // DELETE CATEGORY
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json([
            "message" => "Category deleted"
        ]);
    }

}