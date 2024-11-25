<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            CategoriesTableSeeder::class,
            ProductsTableSeeder::class,
            CartItemsTableSeeder::class,
            ReviewsTableSeeder::class,
            OrdersTableSeeder::class,
            FavoritesTableSeeder::class,
        ]);
    }
}
