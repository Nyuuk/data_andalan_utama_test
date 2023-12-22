<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', [\App\Http\Controllers\UserController::class, 'login']);
Route::post('register', [\App\Http\Controllers\UserController::class, 'register']);
Route::get('logout', [\App\Http\Controllers\UserController::class, 'logout']);

Route::get('product', [\App\Http\Controllers\ProductController::class, 'showAll']);
Route::get('product/{perPage?}/{page?}', [\App\Http\Controllers\ProductController::class, 'showPag']);
Route::post('product', [\App\Http\Controllers\ProductController::class, 'create']);
Route::put('product/{id}', [\App\Http\Controllers\ProductController::class, 'update']);
Route::delete('product/{id}', [\App\Http\Controllers\ProductController::class, 'delete']);

Route::get('transaction', [\App\Http\Controllers\TransactionController::class, 'showAll']);
Route::get('transaction/{perPage?}/{page?}', [\App\Http\Controllers\TransactionController::class, 'showPag']);
Route::post('transaction', [\App\Http\Controllers\TransactionController::class, 'create']);
