<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ProductModerationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\PriceAlertController;
use Illuminate\Support\Facades\Route;

// Публичные маршруты
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);
Route::get('/search', [SearchController::class, 'search']);

// Аутентификация
Route::post('/register', [AuthenticatedSessionController::class, 'register']);
Route::post('/login', [AuthenticatedSessionController::class, 'login']);

// Защищенные маршруты
Route::middleware('auth:sanctum')->group(function () {
    // Аутентификация
    Route::post('/logout', [AuthenticatedSessionController::class, 'logout']);
    
    // Продукты
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    
    // Корзина
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'add']);
    Route::delete('/cart/{cartItem}', [CartController::class, 'remove']);
    
    // Заказы
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    
    // Отзывы
    Route::get('/products/{product}/reviews', [ReviewController::class, 'index']);
    Route::post('/products/{product}/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{review}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
    
    // Избранное
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/products/{product}/favorite', [FavoriteController::class, 'store']);
    Route::delete('/products/{product}/favorite', [FavoriteController::class, 'destroy']);
});

// Webhook для Stripe
Route::post('/webhook/stripe', [OrderController::class, 'webhook']);

// Административные маршруты
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Дашборд
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    
    // Управление пользователями
    Route::get('/users', [AdminController::class, 'users']);
    Route::put('/users/{user}/role', [AdminController::class, 'updateUserRole']);
    Route::delete('/users/{user}', [AdminController::class, 'deleteUser']);
    
    // Модерация товаров
    Route::get('/products/pending', [ProductModerationController::class, 'pendingProducts']);
    Route::post('/products/{product}/approve', [ProductModerationController::class, 'approveProduct']);
    Route::post('/products/{product}/reject', [ProductModerationController::class, 'rejectProduct']);
    Route::delete('/products/{product}', [ProductModerationController::class, 'deleteProduct']);
    
    // Теги
    Route::get('/tags', [TagController::class, 'index']);
    Route::get('/tags/{tag}', [TagController::class, 'show']);
    Route::post('/tags', [TagController::class, 'store']);
    Route::delete('/tags/{tag}', [TagController::class, 'destroy']);
    
    // Скидки
    Route::get('/discounts', [DiscountController::class, 'index']);
    Route::post('/discounts', [DiscountController::class, 'store']);
    Route::delete('/discounts/{discount}', [DiscountController::class, 'destroy']);
    
    // Уведомления о цене
    Route::get('/price-alerts', [PriceAlertController::class, 'index']);
    Route::post('/products/{product}/price-alert', [PriceAlertController::class, 'store']);
    Route::delete('/price-alerts/{alert}', [PriceAlertController::class, 'destroy']);
}); 