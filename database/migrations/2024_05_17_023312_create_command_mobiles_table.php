<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('command_mobiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('booking_id')->default(0)->index();
            $table->unsignedBigInteger('invoice_id')->default(0)->index();
            $table->unsignedBigInteger('driver_id')->default(0)->index();
            $table->unsignedBigInteger('route_id')->default(0)->index();
            $table->unsignedBigInteger('romooc_id')->default(0)->index();
            $table->unsignedBigInteger('vehicle_id')->default(0)->index();
            $table->unsignedBigInteger('partner_id')->default(0)->index(); // =0 là xe nhà; =1 là xe ngoài

            $table->integer('quantity')->default(0);
            $table->tinyInteger('product_type')->default(0);
            $table->integer('bonus_driver_money')->default(0); // bồi dưỡng tài xế
            $table->integer('advance_money')->default(0); // tạm ứng
            $table->integer('salary_total')->default(0);
            $table->integer('anchor_vehicle')->default(0); // neo xe
            $table->integer('cont_cut')->default(0);
            // chốt lệnh lưu trong hình ảnh
            $table->integer('price')->default(0); // đơn giá
            $table->tinyInteger('status')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('command_mobiles');
    }
};
