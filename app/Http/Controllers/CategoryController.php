<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('children')
            ->whereNull('parent_id')
            ->get();

        return response()->json($categories);
    }

    public function show(Category $category)
    {
        return response()->json(
            $category->load(['products' => function ($query) {
                $query->where('status', 'active')
                    ->with('images')
                    ->paginate(12);
            }, 'children'])
        );
    }
} 