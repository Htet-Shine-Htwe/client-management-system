<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // \App\Models\Client::factory(40)->create();
        $clients = [];

        for ($i = 0; $i < 40; $i++) {
            $clients[] = [
                'name' => 'Client ' . $i,
                'password' => bcrypt('password'),
                'user_id' => fake()->optional()->numberBetween(1, 10),
                'client_code' => 'Client_' . fake()->unique()->numberBetween(100000, 999999),
            ];
        }

        \App\Models\Client::insert($clients);
    }
}
