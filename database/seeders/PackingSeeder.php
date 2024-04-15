<?php

namespace Database\Seeders;

use App\Models\Packing;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PackingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Bãi đậu 1',
                'address' => 'Hà Nội'
            ],
            [
                'name' => 'Bãi đậu 2',
                'address' => 'Hải Phòng'
            ],
            [
                'name' => 'Bãi đậu 3',
                'address' => 'Sài Gòn'
            ],
        ];

        Packing::insert($data);
    }
}
