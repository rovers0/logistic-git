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
        Schema::create('moocs', function (Blueprint $table) {
            $table->id();
            $table->string('plate')->unique()->comment('Biển số xe');
            $table->string('weight')->nullable()->comment('Tải trọng (kg)');
            $table->string('feet')->nullable()->comment('Kích thước');
            $table->tinyInteger('type')->nullable()->comment('0: Sương; 1: Sàn');
            $table->tinyInteger('parking_lot')->nullable()->comment('Bãi xe');
            $table->string('chassis')->nullable()->comment('Số khung xe');
            $table->string('axle')->nullable()->comment('Trục xe 1: 1 cầu; 2: 2 cầu; 9: chưa xác định');
            $table->text('note')->nullable();
            $table->text('image')->nullable();
            $table->text('attachment')->nullable()->comment('File đính kèm');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moocs');
    }
};
