<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_stock', function (Blueprint $table) {
            $table->id();
            $table->integer('product_id');
            $table->integer('maximo');
            $table->integer('minimo');
            $table->integer('previsao');
            $table->integer('quantity');
            $table->decimal('offered_price',8,2);
            $table->decimal('b2b_price',8,2);
            $table->tinyInteger('encomenda');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_stock');
    }
};
