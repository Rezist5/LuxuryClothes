<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::withCount('products')
            ->orderBy('products_count', 'desc')
            ->get();

        return response()->json($tags);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Tag::class);

        $request->validate([
            'name' => 'required|string|max:255|unique:tags'
        ]);

        $tag = Tag::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json($tag, 201);
    }

    public function show(Tag $tag)
    {
        $products = $tag->products()
            ->with(['images', 'category'])
            ->paginate(12);

        return response()->json([
            'tag' => $tag,
            'products' => $products
        ]);
    }

    public function destroy(Tag $tag)
    {
        $this->authorize('delete', $tag);
        
        $tag->delete();

        return response()->json([
            'message' => 'Тег успешно удален'
        ]);
    }
} 