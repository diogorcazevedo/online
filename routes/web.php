<?php

use App\Http\Controllers\ProposalController;
use App\Http\Controllers\ReverseLogisticController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\ShippingReverseLogisticController;
use App\Http\Controllers\ShippingSigepeController;
use App\Http\Controllers\SigepeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;


//---- ROTAS

Route::get('/',                                                   [DashBoardController::class, 'index'])->name('index')->middleware(['auth', 'verified']);
Route::get('/index',                                              [DashBoardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified']);
Route::get('/dashboard',                                          [DashBoardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified']);
Route::get('/dashboard/index',                                    [DashBoardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified']);


Route::get('sales/index/{year?}/{month?}',                        [SaleController::class, 'index'])->name('sales.index')->middleware(['auth', 'verified']);
Route::get('proposal/index/{year?}/{month?}',                     [ProposalController::class, 'index'])->name('proposal.index')->middleware(['auth', 'verified']);



Route::any('product/index/{collection?}/{category?}',             [ProductController::class, 'index'])->name('product.index')->middleware(['auth', 'verified']);
Route::get('product/create',                                      [ProductController::class, 'create'])->name('product.create')->middleware(['auth', 'verified']);
Route::post('product/store',                                      [ProductController::class, 'store'])->name('product.store')->middleware(['auth', 'verified']);
Route::get('product/edit/{product}',                              [ProductController::class, 'edit'])->name('product.edit')->middleware(['auth', 'verified']);
Route::post('product/update/{product}',                           [ProductController::class, 'update'])->name('product.update')->middleware(['auth', 'verified']);
Route::get('product/destroy/{product}',                           [ProductController::class, 'destroy'])->name('product.destroy')->middleware(['auth', 'verified']);

Route::get('product/images/index/{product}',                      [ProductController::class, 'images'])->name('product.images.index')->middleware(['auth', 'verified']);
Route::post('product/image/store/{product}',                      [ProductController::class, 'imageStore'])->name('product.image.store')->middleware(['auth', 'verified']);
Route::get('product/image_destroy/{image}',                       [ProductController::class, 'imageDestroy'])->name('product.image.destroy')->middleware(['auth', 'verified']);

Route::post('product/price_change/{product}',                     [ProductController::class, 'price_change'])->name('product.price.change')->middleware(['auth', 'verified']);
Route::post('product/price_store/{product}',                      [ProductController::class, 'price_store'])->name('product.price.store')->middleware(['auth', 'verified']);


Route::any('user/index',                                          [UserController::class, 'index'])->name('user.index')->middleware(['auth', 'verified']);
Route::get('user/create',                                         [UserController::class, 'create'])->name('user.create')->middleware(['auth', 'verified']);
Route::get('user/store',                                          [UserController::class, 'store'])->name('user.store')->middleware(['auth', 'verified']);
Route::get('user/edit/{user}',                                    [UserController::class, 'edit'])->name('user.edit')->middleware(['auth', 'verified']);
Route::post('user/update/{user}',                                 [UserController::class, 'update'])->name('user.update')->middleware(['auth', 'verified']);
Route::get('user/destroy/{user}',                                 [UserController::class, 'destroy'])->name('user.destroy')->middleware(['auth', 'verified']);
Route::get('user/password/{user}',                                [UserController::class, 'password'])->name('user.password')->middleware(['auth', 'verified']);
Route::get('user/update_password/{user}',                         [UserController::class, 'update_password'])->name('user.update.password')->middleware(['auth', 'verified']);
Route::get('user/birthdays',                                      [UserController::class, 'birthdays'])->name('user.birthdays')->middleware(['auth', 'verified']);


Route::any('order/client',                                        [OrderController::class, 'client'])->name('order.client')->middleware(['auth', 'verified']);
Route::get('order/store/{user}',                                  [OrderController::class, 'store'])->name('order.store')->middleware(['auth', 'verified']);
Route::any('order/product/{order}/{collection?}/{category?}',     [OrderController::class, 'product'])->name('order.product')->middleware(['auth', 'verified']);
Route::get('order/add/{order}/{product}',                         [OrderController::class, 'add'])->name('order.add')->middleware(['auth', 'verified']);
Route::get('order/remove/{orderItem}',                            [OrderController::class, 'remove'])->name('order.remove')->middleware(['auth', 'verified']);
Route::get('order/edit/{order}',                                  [OrderController::class, 'edit'])->name('order.edit')->middleware(['auth', 'verified']);
Route::post('order/update/{order}',                               [OrderController::class, 'update'])->name('order.update')->middleware(['auth', 'verified']);
Route::get('order/links/{order}',                                 [OrderController::class, 'links'])->name('order.links')->middleware(['auth', 'verified']);
Route::get('order/destroy/{order}',                               [OrderController::class, 'destroy'])->name('order.destroy')->middleware(['auth', 'verified']);



Route::get('shipping/index/{order}',                               [ShippingController::class, 'index'])->name('shipping.index')->middleware(['auth', 'verified']);
Route::get('shipping/get_all/{order}',                             [ShippingController::class, 'get_all'])->name('shipping.get_all')->middleware(['auth', 'verified']);
Route::get('shipping/reverse/{order}',                             [ShippingController::class, 'reverse'])->name('shipping.reverse')->middleware(['auth', 'verified']);
Route::get('shipping/status/{order}',                              [ShippingController::class, 'status'])->name('shipping.status')->middleware(['auth', 'verified']);
Route::post('shipping/store/{order}',                              [ShippingController::class, 'store'])->name('shipping.store')->middleware(['auth', 'verified']);
Route::get('shipping/open',                                        [ShippingController::class, 'open'])->name('shipping.open')->middleware(['auth', 'verified']);
Route::post('shipping/update/{shipping}',                          [ShippingController::class, 'update'])->name('shipping.update')->middleware(['auth', 'verified']);
Route::get('shipping/add_item/{shipping}/{product}',               [ShippingController::class, 'add_item'])->name('shipping.add.item')->middleware(['auth', 'verified']);
Route::get('shipping/destroy_item/{shippingItems}',                [ShippingController::class, 'destroy_item'])->name('shipping.destroy.item')->middleware(['auth', 'verified']);


Route::get('shipping/sigepe/index/{order}',                         [ShippingSigepeController::class, 'index'])->name('shipping.sigepe.index')->middleware(['auth', 'verified']);
Route::get('shipping/sigepe/create/{order}',                        [ShippingSigepeController::class, 'create'])->name('shipping.sigepe.create')->middleware(['auth', 'verified']);
Route::post('shipping/sigepe/store/{order}',                        [ShippingSigepeController::class, 'store'])->name('shipping.sigepe.store')->middleware(['auth', 'verified']);
Route::get('shipping/sigepe/edit/{order}',                          [ShippingSigepeController::class, 'edit'])->name('shipping.sigepe.edit')->middleware(['auth', 'verified']);
Route::post('shipping/sigepe/update/{order}',                       [ShippingSigepeController::class, 'update'])->name('shipping.sigepe.update')->middleware(['auth', 'verified']);


Route::get('shipping/reverse_logistic/index',                      [ShippingReverseLogisticController::class, 'index'])->name('shipping.reverse.logistic.index')->middleware(['auth', 'verified']);
Route::get('shipping/reverse_logistic/show/{order}',               [ShippingReverseLogisticController::class, 'show'])->name('shipping.reverse.logistic.show')->middleware(['auth', 'verified']);
Route::post('shipping/reverse_logistic/store/{order}',             [ShippingReverseLogisticController::class, 'store'])->name('shipping.reverse.logistic.store')->middleware(['auth', 'verified']);
Route::post('shipping/reverse_logistic/update/{reverse}',          [ShippingReverseLogisticController::class, 'update'])->name('shipping.reverse.logistic.update')->middleware(['auth', 'verified']);
Route::delete('shipping/reverse_logistic/destroy/{reverse}',       [ShippingReverseLogisticController::class, 'destroy'])->name('shipping.reverse.logistic.destroy')->middleware(['auth', 'verified']);



Route::get('sigepe/index',                                          [SigepeController::class, 'index'])->name('sigepe.index')->middleware(['auth', 'verified']);
Route::get('sigepe/create',                                         [SigepeController::class, 'create'])->name('sigepe.create')->middleware(['auth', 'verified']);
Route::post('sigepe/store',                                         [SigepeController::class, 'store'])->name('sigepe.store')->middleware(['auth', 'verified']);



Route::get('image/download/{id}',                                   [ImageController::class, 'download'])->name('image.download');

require __DIR__.'/auth.php';
