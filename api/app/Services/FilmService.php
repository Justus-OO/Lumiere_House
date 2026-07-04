<?php

namespace App\Services;

use App\Models\Film;
use Illuminate\Database\Eloquent\Collection;

class FilmService
{
    public function getUpcomingFilms(): Collection
    {
        return Film::orderBy('release_date', 'asc')->get();
    }

    public function getFilmBySlug(string $slug): Film
    {
        return Film::where('slug', $slug)->firstOrFail();
    }
}