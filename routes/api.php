<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiswaController;

Route::apiResource('siswa', SiswaController::class);