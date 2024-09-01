<?php

use App\Enums\RoleEnum;
use App\Http\Controllers\Api\SuperAdminController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){

    RouteRole(enum_value(RoleEnum::SUPER_ADMIN), function(){
        Route::controller(SuperAdminController::class)->group(function(){
            Route::get('admins', 'index')->name("super-admin.index");
            Route::post('admins', 'store')->name("super-admin.store");
            Route::get('admins/{admin}', 'show')->name("super-admin.show");
            Route::put('admins/{admin}', 'update')->name("super-admin.update");
            Route::post('admins/delete/{admin}', 'destroy')->name("super-admin.destroy");
        });
    });

    Route::controller(ClientController::class)->group(function(){

        Route::get('clients', 'index')->name("client.index");

        RouteRole(enum_value(RoleEnum::SUPER_ADMIN), function(){
            Route::post('assign-client', 'assignClient')->name("client.assign");
        });

    });

});
