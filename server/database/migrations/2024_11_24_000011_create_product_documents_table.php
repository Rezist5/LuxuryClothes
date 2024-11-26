<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('product_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('file_path');
            $table->string('type')->default('pdf');
            $table->string('size')->nullable(); // размер файла
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_documents');
    }
}; 