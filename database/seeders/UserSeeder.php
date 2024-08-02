<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = Hash::make('12345678');

        foreach (UserRole::cases() as $key => $value) {
            $account = ($value->value == 1 ? '0' : $value->value) . '123456789';
            $account = substr($account, 0, 10);

            User::updateOrCreate([
                'account' => $account,
            ], [
                'name' => $value->name,
                'email' => $value->name . '@gmail.com',
                'password' => Hash::make('12345678'),
                'phone' => $account,
                'role' => $value->value,
            ]);
        }
    }
}
