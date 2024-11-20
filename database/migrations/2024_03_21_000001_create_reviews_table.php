<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('rating')->comment('От 1 до 5');
            $table->text('comment')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'product_id']);
            $table->index(['product_id', 'rating']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reviews');
    }
}; 