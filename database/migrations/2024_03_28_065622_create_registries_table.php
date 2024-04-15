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
        Schema::create('registries', function (Blueprint $table) {
            $table->id();
            $table->string('fee')->nullable();
            $table->date('valid_date')->nullable();
            $table->date('expired_date')->nullable();
            $table->integer('vehicle_id')->nullable();
            $table->integer('pre_noti')->nullable()->comment('Số ngày sẽ thông báo trước cho user');
            $table->tinyInteger('type')->nullable()->comment('0: Đăng kiểm; 1: Bảo trì đường bộ; 2: BH tự nguyện; 3: BH bắt buộc; 4: Giấy phép đi đường');
            $table->text('note')->nullable();
            $table->integer('vehicle_type')->default(0)->comment('0: vehicle; 1: mooc');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registries');
    }
};
