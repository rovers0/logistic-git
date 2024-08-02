<?php

namespace Database\Seeders;

use App\Models\Carrier;
use Illuminate\Database\Seeder;

class CarrierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Maersk',
            ],
            [
                'name' => 'Msc',
            ],
            [
                'name' => 'Cosco',
            ],
        ];

        Carrier::insert($data);
    }
}
