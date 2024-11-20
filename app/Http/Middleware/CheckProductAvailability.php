<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Product;

class CheckProductAvailability
{
    public function handle($request, Closure $next)
    {
        $product = $request->route('product');
        
        if (!$product || !$product->isAvailable()) {
            return response()->json([
                'message' => 'Товар недоступен для покупки'
            ], 400);
        }

        return $next($request);
    }
} 