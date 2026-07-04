<?php

use App\Http\Controllers\Api\FilmController;
use App\Http\Controllers\Api\NewsletterController;
use Illuminate\Support\Facades\Route;

// Film Slate
Route::get('/films', [FilmController::class, 'index']);
Route::get('/films/{slug}', [FilmController::class, 'show']);

// Guestlist Subscription
Route::post('/subscribe', [NewsletterController::class, 'store']);