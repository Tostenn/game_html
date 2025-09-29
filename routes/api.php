<?php

use App\Http\Controllers\Api\GameController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('game')->name('game.')->middleware('auth:sanctum')->controller(GameController::class)->group(function () {
    Route::post('/{game}/move', 'move')->name('move');
    Route::get('/{game}', 'show')->name('show');
    Route::post('/{game}/win', 'win')->name('win');

});