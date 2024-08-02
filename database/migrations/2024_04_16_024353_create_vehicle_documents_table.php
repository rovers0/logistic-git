<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehicleDocumentsTable extends Migration
{
    public function up()
    {
        Schema::create('vehicle_documents', function (Blueprint $table) {
            $table->id();
            $table->integer('document_type')->default(1)->comment('1: đăng kiểm; 2: bảo trì đường bộ;3:BH tự nguyện; 4: BH bắt buộc;5: Giấy phép đi đường');
            $table->date('registration_date')->nullable()->comment('ngày đăng kí');
            $table->date('effective_date')->nullable()->comment('ngày hiệu lực');
            $table->date('expiration_date')->nullable()->comment('ngày hết hạn');
            $table->bigInteger('fees')->nullable()->comment('tiền phí');
            $table->integer('notice_duration')->nullable()->comment('số ngày báo trước');
            $table->string('note')->nullable()->comment('ghi chu');
            $table->unsignedBigInteger('documentable_id');
            $table->string('documentable_type');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('vehicle_documents');
    }
}
