<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Discount::class);

        $discounts = Discount::latest()->paginate(15);
        return response()->json($discounts);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Discount::class);

        $validated = $request->validate([
            'code' => 'required|string|unique:discounts',
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'starts_at' => 'required|date',
            'ends_at' => 'required|date|after:starts_at',
            'usage_limit' => 'nullable|integer|min:1',
            'is_active' => 'boolean'
        ]);

        $discount = Discount::create($validated);

        return response()->json($discount, 201);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'amount' => 'required|numeric|min:0'
        ]);

        $discount = Discount::where('code', $request->code)
            ->where('is_active', true)
            ->first();

        if (!$discount || !$discount->isValid()) {
            return response()->json([
                'message' => 'Недействительный промокод'
            ], 400);
        }

        $discountAmount = $discount->calculateDiscount($request->amount);

        return response()->json([
            'discount' => $discount,
            'discount_amount' => $discountAmount,
            'final_amount' => $request->amount - $discountAmount
        ]);
    }

    public function destroy(Discount $discount)
    {
        $this->authorize('delete', $discount);
        
        $discount->delete();

        return response()->json([
            'message' => 'Промокод успешно удален'
        ]);
    }
} 