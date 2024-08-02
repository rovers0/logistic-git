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
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->nullable()->default(null);
            $table->string('name')->nullable()->default(null);
            $table->integer('km')->default(0);
            $table->string('cont_type')->nullable()->default(null);
            $table->string('is_1_axle_vehicle')->nullable()->default(null);
            $table->string('is_2_axle_vehicle')->nullable()->default(null);
            $table->integer('cont_salary')->default(0);
            $table->integer('route_salary')->default(0);
            $table->integer('price')->default(0);
            $table->integer('commission')->default(0);
            $table->integer('quantity')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('routes');
    }
};
