<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use App\Models\Category;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_products' => Product::count(),
            'pending_products' => Product::where('status', Product::STATUS_PENDING)->count(),
            'active_products' => Product::where('status', Product::STATUS_ACTIVE)->count(),
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', Order::STATUS_PENDING)->count(),
            'total_categories' => Category::count(),
            'total_sales' => Order::where('payment_status', 'paid')->sum('total_amount'),
        ];

        return response()->json($stats);
    }

    public function users(Request $request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%");
            });
        }

        $users = $query->with(['products', 'orders'])
            ->withCount(['products', 'orders'])
            ->paginate(15);

        return response()->json($users);
    }

    public function updateUserRole(User $user, Request $request)
    {
        $request->validate([
            'role' => 'required|in:user,admin',
        ]);

        if ($user->id === auth()->id()) {
            return response()->json([
                'message' => 'Нельзя изменить свою собственную роль'
            ], 400);
        }

        $user->update(['role' => $request->role]);

        return response()->json($user);
    }

    public function deleteUser(User $user)
    {
        if ($user->id === auth()->id()) {
            return response()->json([
                'message' => 'Нельзя удалить свой собственный аккаунт'
            ], 400);
        }

        $user->delete();

        return response()->json([
            'message' => 'Пользователь успешно удален'
        ]);
    }
} 