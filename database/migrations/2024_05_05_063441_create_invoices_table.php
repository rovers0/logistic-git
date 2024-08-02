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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('booking_id')->default(0)->index();
            $table->tinyInteger('product_type')->default(0)->index();
            $table->unsignedBigInteger('carrier_id')->default(0)->index();
            $table->string('carrier_number')->nullable()->default(null);
            $table->dateTime('time_transport')->nullable()->default(null);
            $table->dateTime('time_down_the_line')->nullable()->default(null);
            $table->tinyInteger('method_command')->default(0)->index();
            $table->integer('method_command_number')->default(0);
            $table->string('booking_code')->nullable()->default(null);
            $table->integer('driver_salary')->default(0);
            $table->string('location_start')->nullable()->default(null);
            $table->string('location_end')->nullable()->default(null);

            $table->integer('km')->default(0);
            $table->string('cont_type')->nullable()->default(null); // loại cont
            $table->string('is_1_axle_vehicle')->nullable()->default(null);
            $table->string('is_2_axle_vehicle')->nullable()->default(null);
            $table->integer('cont_salary')->default(0);
            $table->integer('route_salary')->default(0);
            $table->integer('price')->default(0); //cont đơn giá
            $table->integer('commission')->default(0);
            $table->integer('quantity')->default(0); // số lượng cont / hàng
            $table->tinyInteger('status')->default(0)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
