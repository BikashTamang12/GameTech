<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- Authentication & Users ---
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login_backend.php', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);
Route::get('/users', [AuthController::class, 'getUsers']);
Route::match(['get', 'post'], '/user.php', function (Request $request, AuthController $auth) {
    if ($request->isMethod('post')) {
        return $auth->register($request);
    }
    return $auth->getUsers();
});

Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::match(['get', 'post', 'options'], '/forgetPassword.php', [AuthController::class, 'forgotPassword']);

// --- Products ---
Route::get('/products', [ProductController::class, 'index']);
Route::match(['get', 'post'], '/getproduct.php', [ProductController::class, 'index']);
Route::match(['get', 'post'], '/getProducts.php', [ProductController::class, 'index']);

Route::get('/products/homepage', [ProductController::class, 'homepageProducts']);
Route::get('/customerMainPageProductlist.php', [ProductController::class, 'homepageProducts']);

Route::get('/products/details', [ProductController::class, 'productDetails']);
Route::get('/mainCardDetails.php', [ProductController::class, 'productDetails']);

Route::get('/products/filter', [ProductController::class, 'filterByCategory']);
Route::get('/filterProduct.php', [ProductController::class, 'filterByCategory']);

Route::post('/products', [ProductController::class, 'store']);
Route::post('/addProduct.php', [ProductController::class, 'store']);

Route::post('/products/update', [ProductController::class, 'update']);
Route::match(['get', 'post'], '/updateProduct.php', [ProductController::class, 'update']);
Route::match(['get', 'post'], '/editProduct.php', [ProductController::class, 'update']);

Route::delete('/products', [ProductController::class, 'destroy']);
Route::match(['get', 'post', 'delete'], '/deleteProduct.php', [ProductController::class, 'destroy']);

// --- Cart ---
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::post('/addToCartBack.php', [CartController::class, 'addToCart']);

Route::match(['get', 'post'], '/cart/items', [CartController::class, 'getCartItems']);
Route::match(['get', 'post'], '/getCartItem.php', [CartController::class, 'getCartItems']);

Route::post('/cart/update', [CartController::class, 'updateQuantity']);
Route::post('/UpdateCardItem.php', [CartController::class, 'updateQuantity']);

Route::post('/cart/delete', [CartController::class, 'deleteItem']);
Route::post('/DeleteCartItem.php', [CartController::class, 'deleteItem']);

// --- Orders ---
Route::post('/orders/place', [OrderController::class, 'placeOrder']);
Route::post('/PlaceOreder.php', [OrderController::class, 'placeOrder']);

Route::get('/orders', [OrderController::class, 'fetchAllOrders']);
Route::get('/FetchOrders.php', [OrderController::class, 'fetchAllOrders']);

Route::match(['get', 'post'], '/orders/customer', [OrderController::class, 'fetchCustomerOrders']);
Route::match(['get', 'post'], '/fetchorderCustomer.php', [OrderController::class, 'fetchCustomerOrders']);

Route::post('/orders/cancel', [OrderController::class, 'cancelOrderByAdmin']);
Route::post('/cancelOrder.php', [OrderController::class, 'cancelOrderByAdmin']);

Route::post('/orders/customer-cancel', [OrderController::class, 'cancelOrderByCustomer']);
Route::post('/addorderStatusCustomer.php', [OrderController::class, 'cancelOrderByCustomer']);

Route::get('/orders/canceled', [OrderController::class, 'fetchCanceledOrders']);
Route::get('/fetchCanceledOders.php', [OrderController::class, 'fetchCanceledOrders']);

Route::post('/orders/delivery-date', [OrderController::class, 'updateDeliveryDate']);
Route::post('/deliverydate.php', [OrderController::class, 'updateDeliveryDate']);

Route::post('/orders/order-date', [OrderController::class, 'updateOrderDate']);
Route::post('/oderDate.php', [OrderController::class, 'updateOrderDate']);
