<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\BrandController;
use App\Http\Controllers\Api\V1\CommandMobileController;
use App\Http\Controllers\Api\V1\CommonController;
use App\Http\Controllers\Api\V1\CustomerController;
use App\Http\Controllers\Api\V1\DriverController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\RomoocController;
use App\Http\Controllers\Api\V1\RouteController;
use App\Http\Controllers\Api\V1\ReportController;
use App\Http\Controllers\Api\V1\VehicleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::get('/fees', [CommonController::class, 'getFees']);
    Route::post('/changeMenuType', [CommonController::class, 'changeMenuType']);
    Route::post('/delete-media/{document:id}', [CommonController::class, 'deleteDocumentImages']);
});

Route::prefix('vehicle')->name('vehicle.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [VehicleController::class, 'index']);
    Route::get('/master', [VehicleController::class, 'master']);
    Route::post('/add', [VehicleController::class, 'store']);
    Route::post('/{vehicle:id}', [VehicleController::class, 'update']);
    Route::post('/{vehicle:id}/documents', [VehicleController::class, 'document']);
    Route::delete('/{vehicle:id}', [VehicleController::class, 'destroy']);
    Route::delete('/{vehicle:id}/destroy-media/{id}', [VehicleController::class, 'destroyMedia']);
    Route::delete('/{vehicle:id}/destroy-document-media/{id}', [VehicleController::class, 'destroyDocumentMedia']);
});

Route::prefix('driver')->name('driver.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [DriverController::class, 'index']);
    Route::get('/master', [DriverController::class, 'master']);
    Route::get('/all', [DriverController::class, 'getDriverAll']);
    Route::post('/import', [DriverController::class, 'import']);
    Route::post('/', [DriverController::class, 'store']);
    Route::post('/{driver:id}', [DriverController::class, 'update']);
    Route::delete('/{driver:id}', [DriverController::class, 'destroy']);
    Route::delete('/{driver:id}/destroy-media/{id}', [DriverController::class, 'destroyMedia']);
});

Route::prefix('romooc')->name('romooc.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [RomoocController::class, 'index']);
    Route::get('/master', [RomoocController::class, 'master']);
    Route::get('/all', [RomoocController::class, 'getAll']);
    Route::post('/import', [RomoocController::class, 'import']);
    Route::post('/', [RomoocController::class, 'store']);
    Route::post('/{romooc:id}', [RomoocController::class, 'update']);
    Route::post('/{romooc:id}/documents', [RomoocController::class, 'document']);
    Route::delete('/{romooc:id}', [RomoocController::class, 'destroy']);
    Route::delete('/{romooc:id}/destroy-media/{id}', [RomoocController::class, 'destroyMedia']);
    Route::delete('/{romooc:id}/destroy-document-media/{id}', [RomoocController::class, 'destroyMedia']);
});

Route::prefix('booking')->name('booking.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [BookingController::class, 'index']);
    Route::get('/master', [BookingController::class, 'master']);
    Route::post('/', [BookingController::class, 'store']);
    Route::get('/{booking:id}', [BookingController::class, 'show']);
    Route::post('/{booking:id}', [BookingController::class, 'update']);
    Route::delete('/{booking:id}', [BookingController::class, 'destroy']);
    Route::post('/{booking:id}/copy', [BookingController::class, 'copy']);
});

Route::prefix('order')->name('order.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [OrderController::class, 'index']);
});

Route::prefix('customer')->name('customer.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [CustomerController::class, 'index']);
});

Route::prefix('brand')->name('brand.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [BrandController::class, 'index']);
    Route::post('/', [BrandController::class, 'store']);
});

Route::prefix('route')->name('route.')->middleware(['auth:sanctum'])->group(function () {
    Route::post('/', [RouteController::class, 'store']);
});

Route::prefix('command-mobile')->name('command-mobile.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [CommandMobileController::class, 'index']);
    Route::get('/master', [CommandMobileController::class, 'master']);
    Route::get('/{id}', [CommandMobileController::class, 'show']);
    Route::post('/{id}', [CommandMobileController::class, 'update']);
    Route::post('/{id}/update-get-cont-good', [CommandMobileController::class, 'updateGetContGood']);
    Route::post('/{id}/update-cut-mooc-down-good', [CommandMobileController::class, 'updateCutMoocDownGood']);
    Route::post('/{id}/update-get-cont-empty', [CommandMobileController::class, 'updateGetContEmpty']);
    Route::post('/{id}/update-down-packing', [CommandMobileController::class, 'updateDownPacking']);
    Route::post('/{id}/update-closed-command', [CommandMobileController::class, 'updateCompleted']);
    Route::post('/{id}/incurred', [CommandMobileController::class, 'storeIncurred']);
    Route::post('/{id}/incurred/{incurred_id}', [CommandMobileController::class, 'confirmIncurred']);
    Route::delete('/{id}/incurred/{incurred_id}', [CommandMobileController::class, 'deleteIncurred']);
});

Route::prefix('report')->name('report.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [ReportController::class, 'index']);
    Route::get('/detail', [ReportController::class, 'show']);
    Route::get('/master', [ReportController::class, 'master']);
    Route::get('/vehicle', [ReportController::class, 'reportByVehicle']);
});
