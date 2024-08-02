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
        Schema::create('command_mobile_incurreds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('command_mobile_id')->default(0)->index();
            $table->integer('money')->default(0); // số tiền thanh toán
            $table->integer('customer_money')->default(0); // số tiền thu khách
            $table->tinyInteger('fee_id')->default(0);
            $table->string('note')->nullable()->default(null);
            $table->dateTime('invoice_date')->nullable()->default(null);
            $table->string('invoice_code')->nullable()->default(null);
            $table->tinyInteger('incurred_from')->default(0); // chi từ
            $table->tinyInteger('customer_collect')->default(0); // thu khách
            $table->tinyInteger('is_no_need_confirm')->default(0); // chốt
            $table->tinyInteger('status')->default(0);
            $table->dateTime('confirm_at')->nullable()->default(null);
            $table->unsignedBigInteger('confirm_by_user_id')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('command_mobile_incurreds');
    }
};
