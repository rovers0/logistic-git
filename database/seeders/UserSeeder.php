<?php

namespace Database\Seeders;

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
        DB::unprepared("
            INSERT INTO users(name,email,password,phone,role,account) VALUES('Test','admin@gmail.com','$password','0123456789',1,'0123456789');
        ");
    }
}
