<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FilmResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'genre' => $this->genre,
            'release_date' => $this->release_date->format('Y-m-d'),
            'logline' => $this->logline,
            'synopsis' => $this->synopsis,
            'director' => $this->director,
            'poster_url' => $this->poster_url,
            'trailer_url' => $this->trailer_url,
        ];
    }
}