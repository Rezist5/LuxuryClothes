<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ResetPasswordController extends Controller
{
    public function sendResetEmail(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email'
            ]);

            $user = User::where('email', $request->email)->first();
            $resetCode = Str::random(6);

            DB::table('password_resets')->updateOrInsert(
                ['email' => $user->email],
                [
                    'token' => Hash::make($resetCode),
                    'created_at' => now()
                ]
            );

            // Формируем ссылку для сброса пароля
            $resetLink = env('FRONTEND_URL') . "/reset-password?email=" . urlencode($user->email) . "&code=" . $resetCode;

            // Отправляем письмо со ссылкой
            Mail::raw(
                "Для сброса пароля перейдите по ссылке:\n\n{$resetLink}\n\nЕсли вы не запрашивали сброс пароля, проигнорируйте это письмо.",
                function($message) use ($user) {
                    $message->to($user->email)
                            ->subject('Сброс пароля');
                }
            );

            return response()->json([
                'message' => 'Инструкции для сброса пароля отправлены на вашу почту'
            ]);

        } catch (\Exception $e) {
            \Log::error('Reset password error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Не удалось отправить инструкции'
            ], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email',
                'code' => 'required|string',
                'password' => 'required|min:8|confirmed'
            ]);

            $reset = DB::table('password_resets')
                ->where('email', $request->email)
                ->first();

            if (!$reset || !Hash::check($request->code, $reset->token)) {
                return response()->json([
                    'message' => 'Неверный код'
                ], 400);
            }

            // Обновляем пароль
            User::where('email', $request->email)->update([
                'password' => Hash::make($request->password)
            ]);

            // Удаляем использованный код
            DB::table('password_resets')->where('email', $request->email)->delete();

            return response()->json([
                'message' => 'Пароль успешно изменен'
            ]);

        } catch (\Exception $e) {
            \Log::error('Reset password error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Не удалось изменить пароль'
            ], 500);
        }
    }
} 