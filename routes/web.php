<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'home'])->name('home');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/questions', [\App\Http\Controllers\Client\ClientController::class, 'question_index'])->name('questions');
    Route::get('/my-questions', [\App\Http\Controllers\Client\ClientController::class, 'question_index'])->name('questions');
    Route::post('/questions/insert', [\App\Http\Controllers\Client\ClientController::class, 'question_insert'])->name('question.insert');
});

require __DIR__ . '/auth.php';
