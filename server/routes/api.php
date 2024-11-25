<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

// Публичные маршруты
Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
Route::post('/auth/register', [AuthController::class, 'register'])->name('register');

// Публичные маршруты для продуктов и категорий
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}/products', [CategoryController::class, 'products']);
Route::get('/search', [ProductController::class, 'search']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

// Защищенные маршруты
Route::middleware('auth:sanctum')->group(function () {
    // Аутентификация
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('logout');
    
    // Профиль
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar']);
    
    // Продукты
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    
    // Корзина
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::put('/cart/{cartItem}', [CartController::class, 'updateQuantity']);
    Route::delete('/cart/{cartItem}', [CartController::class, 'removeFromCart']);
    
    // Заказы
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show'])->where('order', '[0-9]+');
    Route::post('/orders/{order}/payment', [OrderController::class, 'uploadPaymentProof']);
    
    // Пользовательские действия
    Route::get('/user/sales', [UserController::class, 'sales']);
    Route::get('/user/purchases', [UserController::class, 'purchases']);
    
    // Избранное
    Route::get('/favorites', [ProductController::class, 'favorites']);
    Route::post('/products/{product}/favorite', [ProductController::class, 'toggleFavorite']);
    
    // Отзывы
    Route::post('/products/{product}/reviews', [ProductController::class, 'addReview']);
    Route::put('/reviews/{review}', [ProductController::class, 'updateReview']);
    Route::delete('/reviews/{review}', [ProductController::class, 'deleteReview']);
});

// Маршруты для сброса пароля
Route::post('/forgot-password', function (Request $request) {
    $request->validate([
        'email' => 'required|email|exists:users,email'
    ]);

    try {
        $user = User::where('email', $request->email)->first();
        $token = Str::random(60);

        DB::table('password_resets')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => Hash::make($token),
                'created_at' => now()
            ]
        );

        $resetUrl = env('FRONTEND_URL') . '/reset-password?email=' . urlencode($user->email) . '&token=' . $token;

        Mail::raw(
            "Для сброса пароля перейдите по ссылке: {$resetUrl}",
            function($message) use ($user) {
                $message->to($user->email)
                        ->subject('Сброс пароля');
            }
        );

        return response()->json([
            'message' => 'Ссылка для сброса пароля отправлена на вашу почту'
        ]);

    } catch (\Exception $e) {
        \Log::error('Reset password error: ' . $e->getMessage());
        return response()->json([
            'error' => 'Не удалось отправить ссылку'
        ], 500);
    }
});

Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'token' => 'required|string',
        'password' => 'required|min:8|confirmed'
    ]);

    try {
        $reset = DB::table('password_resets')
            ->where('email', $request->email)
            ->first();

        if (!$reset || !Hash::check($request->token, $reset->token)) {
            return response()->json([
                'error' => 'Неверная ссылка для сброса пароля'
            ], 400);
        }

        User::where('email', $request->email)->update([
            'password' => Hash::make($request->password)
        ]);

        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json([
            'message' => 'Пароль успешно изменен'
        ]);

    } catch (\Exception $e) {
        \Log::error('Reset password error: ' . $e->getMessage());
        return response()->json([
            'error' => 'Не удалось изменить пароль'
        ], 500);
    }
});

// Webhook routes
Route::post('/webhook/stripe', [OrderController::class, 'webhook']);

// Защищенные маршруты для управления категориями (админка)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/admin/categories', [CategoryController::class, 'store']);
    Route::post('/admin/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/admin/categories/{category}', [CategoryController::class, 'destroy']);
}); 