<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ["name" => "Electronics", "slug" => "electronics", "description" => "Phones, Laptops"],
            ["name" => "Clothing", "slug" => "clothing", "description" => "Fashion items"],
            ["name" => "Books", "slug" => "books", "description" => "All genres"],
            ["name" => "Home & Kitchen", "slug" => "home-kitchen", "description" => "Appliances"],
            ["name" => "Sports", "slug" => "sports", "description" => "Fitness gear"],
        ];
        foreach ($categories as $cat) {
            Category::create($cat);
        }
    }
}
