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
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->index();

            $table->date('birthday')->nullable();
            $table->string('bith_place')->nullable();
            $table->string('passport')->nullable();
            $table->string('relative_phone')->nullable()->comment('SĐT người thân');
            $table->string('relative_name')->nullable()->comment('Tên người thân');
            $table->integer('salary')->nullable();
            $table->integer('allowance')->nullable()->comment('Phụ cấp');
            $table->integer('insurance')->nullable()->comment('Bảo hiểm');
            $table->float('commission_percent')->nullable();
            $table->integer('experient_year')->nullable();

            $table->string('license_class')->nullable()->comment('Hạng bằng lái');
            $table->string('license')->nullable()->comment('Số bằng lái');
            $table->date('license_expired_date')->nullable();
            $table->date('save_date')->nullable()->comment('Thời hạn an toàn');

            $table->integer('receive_user_id')->nullable()->comment('Người nhận CV');
            $table->date('receive_date')->nullable()->comment('Ngày nhận CV');
            $table->date('release_date')->nullable()->comment('Ngày trả CV');
            $table->date('start_date')->nullable()->comment('Ngày vào làm');
            $table->date('end_date')->nullable()->comment('Ngày nghỉ việc');
            $table->tinyInteger('status')->default(1)->comment('0: nghỉ làm; 1: đi làm');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
