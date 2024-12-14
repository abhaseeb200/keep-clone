<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LabelController;


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

Route::get('/', function () {
    return response()->json(['message' => 'Welcome']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notes', [NotesController::class, 'index']);
    Route::get('/search', [NotesController::class, 'search']);
    Route::post('/note', [NotesController::class, 'store']);
    Route::get('/note/{id}', [NotesController::class, 'show']);
    Route::put('/note/{id}', [NotesController::class, 'update']);
    Route::post('/note-image/{id}', [NotesController::class, 'updateImage']);
    Route::delete('/note/{id}', [NotesController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/labels', [LabelController::class, 'index']);
    Route::post('/label', [LabelController::class, 'store']);
    Route::get('/label/{id}', [LabelController::class, 'show']);
    Route::put('/label/{id}', [LabelController::class, 'update']);
    Route::delete('/label/{id}', [LabelController::class, 'destroy']);
});