<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\PriceAlert;
use Illuminate\Http\Request;

class PriceAlertController extends Controller
{
    public function index()
    {
        $alerts = auth()->user()->priceAlerts()
            ->with('product')
            ->latest()
            ->paginate(10);

        return response()->json($alerts);
    }

    public function store(Request $request, Product $product)
    {
        $request->validate([
            'target_price' => 'required|numeric|min:0|lt:' . $product->price
        ]);

        $alert = PriceAlert::create([
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'target_price' => $request->target_price,
            'is_active' => true
        ]);

        return response()->json($alert, 201);
    }

    public function destroy(PriceAlert $alert)
    {
        $this->authorize('delete', $alert);
        
        $alert->delete();

        return response()->json([
            'message' => 'Уведомление о цене удалено'
        ]);
    }
} 