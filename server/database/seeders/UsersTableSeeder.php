<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Создаем администратора
        User::create([
            'name' => 'Admin',
            'email' => 'dudikov.ivanchik@gmail.com',
            'username' => 'admin',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
            'phone' => '+1234567890',
            'city' => 'New York',
            'country' => 'USA',
        ]);

        // Создаем тестового пользователя
        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'username' => 'testuser',
            'password' => Hash::make('password'),
            'role' => 'user',
            'email_verified_at' => now(),
            'phone' => '+0987654321',
            'city' => 'Los Angeles',
            'country' => 'USA',
        ]);

        // Создаем несколько случайных пользователей
        User::factory()->count(8)->create();
    }
} 