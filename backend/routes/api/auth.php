<?php

use App\Http\Controllers\Api\AuthApiController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthApiController::class)->group(function(){
    Route::post('login', 'login')->name("login");

    Route::middleware('auth:sanctum')->group(function(){
        Route::get('me', 'me')->name("me");
        Route::post('logout', 'logout')->name("logout");
    });
});
