<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Product;

class CheckProductStatus
{
    public function handle($request, Closure $next)
    {
        $product = $request->route('product');
        
        if (!$product || $product->status !== Product::STATUS_ACTIVE) {
            return response()->json([
                'message' => 'Product is not available'
            ], 404);
        }

        return $next($request);
    }
} 