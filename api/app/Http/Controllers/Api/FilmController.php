<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FilmResource;
use App\Services\FilmService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FilmController extends Controller
{
    public function __construct(private readonly FilmService $filmService)
    {
    }

    public function index(): AnonymousResourceCollection
    {
        return FilmResource::collection($this->filmService->getUpcomingFilms());
    }

    public function show(string $slug): FilmResource
    {
        return new FilmResource($this->filmService->getFilmBySlug($slug));
    }
}