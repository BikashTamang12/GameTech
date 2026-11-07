<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin customer
        Customer::updateOrCreate(
            ['email' => 'admin@gametech.com'],
            [
                'username' => 'Admin',
                'address' => 'Kathmandu, Nepal',
                'phonenumber' => '9800000000',
                'password' => 'admin123',
                'Role' => 'admin',
            ]
        );

        // 2. Sample user
        Customer::updateOrCreate(
            ['email' => 'user@gametech.com'],
            [
                'username' => 'GamerOne',
                'address' => 'Pokhara, Nepal',
                'phonenumber' => '9811111111',
                'password' => 'user123',
                'Role' => 'user',
            ]
        );

        // 3. Sample products
        if (Product::count() === 0) {
            Product::create([
                'title' => 'Logitech G Pro X Superlight Gaming Mouse',
                'category' => 'Mouse',
                'price' => 14500.00,
                'description' => 'Ultra-lightweight wireless gaming mouse with HERO 25K sensor.',
                'main_image' => 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            ]);

            Product::create([
                'title' => 'Razer BlackWidow V4 Pro Mechanical Keyboard',
                'category' => 'Keyboard',
                'price' => 22000.00,
                'description' => 'Immersive mechanical gaming keyboard with Razer Chroma RGB.',
                'main_image' => 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            ]);

            Product::create([
                'title' => 'SteelSeries Arctis Nova Pro Wireless Headset',
                'category' => 'Headset',
                'price' => 38000.00,
                'description' => 'High-fidelity audio gaming headset with active noise cancellation.',
                'main_image' => 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            ]);
        }
    }
}
