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
        Schema::create('invoice_task_transports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invoice_id')->default(0)->index();
            $table->string('get_null_point')->nullable()->default(null);
            $table->string('get_null_point_request')->nullable()->default(null);
            $table->string('shipping_point')->nullable()->default(null);
            $table->string('shipping_point_request')->nullable()->default(null);
            $table->string('return_null_point')->nullable()->default(null);
            $table->string('return_null_point_request')->nullable()->default(null);
            $table->string('note')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_task_transports');
    }
};
