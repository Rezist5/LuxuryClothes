<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'username' => 'sometimes|string|max:255|unique:users,username,' . $user->id,
            'phone' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);

        try {
            $user->update($validated);
            return response()->json($user);
        } catch (\Exception $e) {
            \Log::error('Profile update error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update profile'], 500);
        }
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048'
        ]);

        try {
            $user = auth()->user();
            
            // Удаляем старый аватар
            if ($user->avatar_url) {
                Storage::disk('public')->delete($user->avatar_url);
            }

            // Сохраняем новый аватар
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->update(['avatar_url' => $path]);

            return response()->json($user);
        } catch (\Exception $e) {
            \Log::error('Avatar update error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update avatar'], 500);
        }
    }
}
