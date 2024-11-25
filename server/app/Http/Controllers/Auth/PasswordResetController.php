<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class PasswordResetController extends Controller
{
    public function sendResetLink(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email'
            ]);

            $token = Str::random(64);
            $email = $request->email;

            // Удаляем старые токены
            DB::table('password_reset_tokens')
                ->where('email', $email)
                ->delete();

            // Создаем новый токен
            DB::table('password_reset_tokens')->insert([
                'email' => $email,
                'token' => $token,
                'expires_at' => Carbon::now()->addHours(1),
                'created_at' => Carbon::now()
            ]);

            // Используем базовый класс для отправки писем
            \Illuminate\Support\Facades\Mail::raw(
                "Для сброса пароля используйте этот код: {$token}",
                function ($message) use ($email) {
                    $message->to($email)
                            ->subject('Сброс пароля в LuxSwap');
                }
            );

            Log::info('Reset password email sent', ['email' => $email]);

            return response()->json([
                'message' => 'На вашу почту отправлен код для сброса пароля'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to send reset password email', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Не удалось отправить код для сброса пароля'
            ], 500);
        }
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'password' => 'required|min:8|confirmed'
        ]);

        $resetToken = DB::table('password_reset_tokens')
            ->where('token', $request->token)
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$resetToken) {
            return response()->json([
                'message' => 'Неверный или устаревший токен сброса пароля'
            ], 400);
        }

        $user = User::where('email', $resetToken->email)->first();
        
        if (!$user) {
            return response()->json([
                'message' => 'Пользователь не найден'
            ], 404);
        }

        // Обновляем пароль
        $user->password = Hash::make($request->password);
        $user->save();

        // Удаляем использованный токен
        DB::table('password_reset_tokens')
            ->where('token', $request->token)
            ->delete();

        return response()->json([
            'message' => 'Пароль успешно изменен'
        ]);
    }
} 