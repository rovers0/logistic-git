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
        Schema::create('conts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invoice_id')->default(0)->index();
            $table->unsignedBigInteger('command_mobile_id')->default(0)->index();
            $table->string('code')->nullable()->default(null);
            $table->string('seal')->nullable()->default(null);
            $table->string('gross')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conts');
    }
};
