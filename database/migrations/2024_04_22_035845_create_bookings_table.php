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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->default(0)->index();

            $table->tinyInteger('is_home_vehicle')->default(1)->index();

            $table->tinyInteger('fee_transport_type')->default(0)->index();

            $table->integer('customer_id')->default(0)->index();
            $table->integer('route_id')->default(0)->index();

            $table->tinyInteger('is_has_partner')->default(0)->index();
            $table->integer('partner_id')->default(0)->index();

            $table->integer('partner_cont_quantity')->default(0);
            $table->integer('partner_cont_type')->default(0);
            $table->integer('partner_price')->default(0);
            $table->text('partner_note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
