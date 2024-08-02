<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ DỊCH VỤ VẬN TẢI QUANG KHÁNH',
                'short_name' => 'Quang Khánh',
                'tax_no' => '0201135134',
                'phone' => '0936507586',
                'address' => 'Số 311 Lê Thánh Tông, Phường Máy Chai, Quận Ngô Quyền, Thành Phố Hải Phòng, Việt Nam'
            ],
            [
                'name' => 'CT Hải Sơn',
                'short_name' => 'Hải Sơn',
                'tax_no' => 'mst',
                'phone' => '0356673187',
                'address' => 'đc'
            ],
            [
                'name' => 'CÔNG TY TNHH EZOCEAN LOGISTICS VIETNAM',
                'short_name' => 'EZOCEAN- NORTH',
                'tax_no' => '0318241102',
                'phone' => '0906726627',
                'address' => 'Tầng 5, Số 30-32 Yersin, Phường Nguyễn Thái Bình, Quận 1, Thành phố Hồ Chí Minh, Việt Nam'
            ],
        ];

        Customer::insert($data);
    }
}
