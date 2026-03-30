<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            "name" => "required|string|max:255",

            "description" => "nullable|string",

            "price" => "required|numeric|min:0",

            "stock" => "required|integer|min:0",

            "image" => "nullable|image|mimes:jpg,jpeg,png|max:2048",

            "status" => "nullable|boolean",

            "is_featured" => "nullable|boolean",

            "category_id" => "required|exists:categories,id"

        ];
    }

}