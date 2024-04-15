<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CommonController;
use App\Http\Controllers\Api\V1\DriverController;
use App\Http\Controllers\Api\V1\RomoocController;
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
    Route::post('/changeMenuType', [CommonController::class, 'changeMenuType']);
});

Route::prefix('vehicle')->name('vehicle.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [VehicleController::class, 'index']);
    Route::get('/master', [VehicleController::class, 'master']);
    Route::post('/add', [VehicleController::class, 'store']);
    Route::post('/{vehicle:id}', [VehicleController::class, 'update']);
    Route::delete('/{vehicle:id}', [VehicleController::class, 'destroy']);
});

Route::prefix('driver')->name('driver.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [DriverController::class, 'index']);
    Route::get('/master', [DriverController::class, 'master']);
    Route::post('/import', [DriverController::class, 'import']);
    Route::post('/', [DriverController::class, 'store']);
    Route::post('/{driver:id}', [DriverController::class, 'update']);
    Route::delete('/{driver:id}', [DriverController::class, 'destroy']);
});

Route::prefix('romooc')->name('romooc.')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/', [RomoocController::class, 'index']);
    Route::get('/master', [RomoocController::class, 'master']);
    Route::get('/all', [RomoocController::class, 'getAll']);
    Route::post('/import', [RomoocController::class, 'import']);
    Route::post('/', [RomoocController::class, 'store']);
    Route::post('/{romooc:id}', [RomoocController::class, 'update']);
    Route::delete('/{romooc:id}', [RomoocController::class, 'destroy']);
});
