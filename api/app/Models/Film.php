<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'genre',
        'release_date',
        'logline',
        'synopsis',
        'director',
        'poster_url',
        'trailer_url',
    ];

    protected function casts(): array
    {
        return [
            'release_date' => 'date',
        ];
    }
}