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
        Schema::create('romoocs', function (Blueprint $table) {
            $table->id();
            $table->string('serial')->nullable()->default(null);
            $table->string('frame_number')->default(0);
            $table->integer('packing_id')->default(0);
            $table->integer('weight')->default(0);
            $table->integer('size')->default(0);
            $table->tinyInteger('type')->default(0);
            $table->integer('axis')->default(0);
            $table->string('note')->nullable()->default(null);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('romoocs');
    }
};
