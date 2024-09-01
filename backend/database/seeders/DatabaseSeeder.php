<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            RolePermissionSeeder::class
        ]);
        \App\Models\User::factory(10)->create()->each(function ($user) {
            $user->assignRole('admin');
        });

        $super_admin = User::factory()->create([
            'name' => 'Super Admin',
            'code' => 'admin-1',
            'password' => bcrypt('password'),
        ]);

        $super_admin->assignRole('super-admin');

        $this->call([
            ClientSeeder::class
        ]);
    }
}
