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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('plate')->unique()->comment('Biển số xe');
            $table->string('axle')->nullable()->comment('Cầu xe; 1: 1 cầu; 2: 2 cầu; 9: chưa xác định');
            $table->string('mooc')->nullable()->comment('Khung container');
            $table->tinyInteger('type')->nullable()->comment('0: xe nhà; 1: xe cổ đông');
            $table->tinyInteger('status')->nullable()->comment('0: ngưng vận hành; 1: đang vận hành')->default(1);
            $table->tinyInteger('parking_lot')->nullable()->comment('Bãi xe');
            $table->string('chassis')->nullable()->comment('Số khung xe');
            $table->string('seri')->nullable()->comment('Số máy');
            $table->text('note')->nullable();
            $table->integer('driver_id')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
