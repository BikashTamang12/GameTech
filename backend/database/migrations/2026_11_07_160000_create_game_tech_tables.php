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
        // 1. customer table
        Schema::create('customer', function (Blueprint $table) {
            $table->id('id');
            $table->string('username');
            $table->string('address')->nullable();
            $table->string('phonenumber')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('Role')->default('user'); // 'user' or 'admin'
            $table->timestamps();
        });

        // 2. products table
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->string('title');
            $table->string('category');
            $table->decimal('price', 10, 2);
            $table->text('description')->nullable();
            $table->longText('main_image')->nullable();
            $table->longText('sub_image')->nullable();
            $table->timestamps();
        });

        // 3. cart table
        Schema::create('cart', function (Blueprint $table) {
            $table->id('cart_id');
            $table->unsignedBigInteger('product_id')->nullable();
            $table->string('title');
            $table->decimal('price', 10, 2);
            $table->integer('quantity')->default(1);
            $table->longText('main_image')->nullable();
            $table->unsignedBigInteger('id')->nullable(); // customer id
            $table->timestamps();
        });

        // 4. placed_oders table
        Schema::create('placed_oders', function (Blueprint $table) {
            $table->id('order_id');
            $table->unsignedBigInteger('product_id')->nullable();
            $table->string('title');
            $table->decimal('price', 10, 2);
            $table->integer('quantity')->default(1);
            $table->longText('main_image')->nullable();
            $table->string('recievername')->nullable();
            $table->string('recieverphone')->nullable();
            $table->string('recieveraddress')->nullable();
            $table->string('paymentMode')->default('Cash on Delivery');
            $table->string('delivery_date')->nullable();
            $table->string('order_date')->nullable();
            $table->string('status')->nullable();
            $table->string('customer_status')->nullable();
            $table->unsignedBigInteger('id')->nullable(); // customer id
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('placed_oders');
        Schema::dropIfExists('cart');
        Schema::dropIfExists('products');
        Schema::dropIfExists('customer');
    }
};
