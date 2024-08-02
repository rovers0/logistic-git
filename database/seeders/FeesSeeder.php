<?php

namespace Database\Seeders;

use App\Enums\FeeIncurredType;
use App\Models\Fees;
use Illuminate\Database\Seeder;

class FeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['name' => 'Phí VAT', 'type' => FeeIncurredType::OTHER->value,],
            ['name' => 'lốp', 'type' => FeeIncurredType::TIRE->value],
            ['name' => 'Lãi vay', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí sửa chữa cont', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'In lệnh', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí lấy vỏ', 'type' => FeeIncurredType::TIRE->value],
            ['name' => 'Làm ngoài giờ', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Ca xe', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Kẹp', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Kết hợp + vệ sinh', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Chì', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Biên bản', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí hạ hàng', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí nâng vỏ', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Tiền Đường Lái Xe', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí hợp quy', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Bồi dưỡng bốc xếp', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí hạ xa', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí gửi cont', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí khác', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí ngân hàng', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Tiền điện văn phòng', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí hạ vỏ', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí nâng hàng', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí sửa chữa - vá lốp', 'type' => FeeIncurredType::TIRE->value],
            ['name' => 'Phí phát sinh thay lốp', 'type' => FeeIncurredType::TIRE->value],
            ['name' => 'Phí cảng', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí lưu cont, lưu bãi', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí thanh lí hải quan', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí thuê văn phòng', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí đảo vỏ cont', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí Hạ sớm', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí lấy cont trái tuyến', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí kiểm cont', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí mạng viễn thông', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí cơ sở hạ tầng', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Thanh toán tiền sửa chữa', 'type' => FeeIncurredType::SUGGESTION_FIX->value],
            ['name' => 'Phí sửa chữa xe', 'type' => FeeIncurredType::SUGGESTION_FIX->value],
            ['name' => 'Phí Xét Đăng Kiểm', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí cược cont', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí cân xe', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí vé cổng', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí nâng', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí hạ', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí neo xe', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí Vệ sinh', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Phí văn phòng', 'type' => FeeIncurredType::OTHER->value],
            ['name' => 'Tiền Thanh toán dầu DO', 'type' => FeeIncurredType::FUEL->value],
            ['name' => 'Phí nhớt', 'type' => FeeIncurredType::FUEL->value],
            ['name' => 'Phí vá vỏ', 'type' => FeeIncurredType::TIRE->value],
            ['name' => 'Phí rửa xe bơm mỡ', 'type' => FeeIncurredType::SOME_FIX->value],
            ['name' => 'Phí vé cầu đường', 'type' => FeeIncurredType::OTHER->value],
        ];

        Fees::insert($data);
    }
}
