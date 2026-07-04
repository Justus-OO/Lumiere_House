<?php

namespace Database\Seeders;

use App\Models\Film;
use App\Models\Subscriber;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // A curated slate of real-world premium, cinematic film projects
        $films = [
            [
                'title' => 'Resident Evil',
                'slug' => 'resident-evil',
                'genre' => 'Survival Horror',
                'release_date' => '2026-09-11',
                'logline' => 'The nightmare returns to Raccoon City.',
                'synopsis' => 'A new generation uncovers the dark secrets of the Umbrella Corporation, leading to a terrifying fight for survival against bio-engineered horrors. Starring Austin Abrams.',
                'director' => 'TBA',
                'poster_url' => 'https://m.media-amazon.com/images/M/MV5BNDdjZDYxYjUtZDg3Zi00ZGFlLTlmMGUtMGJjMTQwOTA2NmZiXkEyXkFqcGc@._V1_QL75_UX582_.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=79Sd4GtOXuI',
            ],
            [
                'title' => 'The Hunger Games: Sunrise on the Reaping',
                'slug' => 'sunrise-on-the-reaping',
                'genre' => 'Dystopian Action',
                'release_date' => '2026-11-20',
                'logline' => 'Welcome to the 50th Hunger Games.',
                'synopsis' => 'As the Second Quarter Quell begins, Haymitch Abernathy is forced to compete in the deadliest arena Panem has ever seen. Starring Mckenna Grace and Joseph Zada.',
                'director' => 'Francis Lawrence',
                'poster_url' => 'https://m.media-amazon.com/images/M/MV5BYTMzZmNhODctYTcyNS00M2UyLWJmNDUtZDg1MzA2NDAwZTNjXkEyXkFqcGc@._V1_QL75_UX492_.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=fS35YSjopjE',
            ],
            [
                'title' => 'The Mark',
                'slug' => 'the-mark',
                'genre' => 'Action Thriller',
                'release_date' => '2026-05-14',
                'logline' => 'You cannot outrun your own identity.',
                'synopsis' => 'A relentless action thriller about a deadly conspiracy and a race against time to uncover the truth behind a mysterious mark. Starring Jessica Alba and Tom Hopper.',
                'director' => 'Nima Nourizadeh',
                'poster_url' => 'https://m.media-amazon.com/images/M/MV5BODIxYTkwMTMtYmJlNC00MWU5LWFiNDEtNTgwY2ZhYmFjYjBkXkEyXkFqcGc@._V1_QL75_UX540_.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=F6tzYvK5BTM',
            ],
            [
                'title' => 'Stranger Things: Tales from \'85',
                'slug' => 'stranger-things-tales-from-85',
                'genre' => 'Sci-Fi Horror',
                'release_date' => '2025-10-31',
                'logline' => 'Hawkins has more secrets to tell.',
                'synopsis' => 'Chapter Two: Bad Harvest. A new group of kids in Hawkins stumble upon a lingering remnant of the Upside Down in the aftermath of the Starcourt Mall disaster.',
                'director' => 'The Duffer Brothers',
                'poster_url' => 'https://m.media-amazon.com/images/M/MV5BYjY0YmRmNWYtODYyMy00NGZmLWFjM2YtNWJlNGU2NzdmZmFlXkEyXkFqcGc@._V1_QL75_UX621_.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=kajCUhg36R0',
            ],
            [
                'title' => 'Michael',
                'slug' => 'michael',
                'genre' => 'Biographical Drama',
                'release_date' => '2025-04-18',
                'logline' => 'The man, the music, the magic.',
                'synopsis' => 'A brilliant and complicated portrait of the King of Pop, chronicling his life, his most iconic performances, and the unparalleled legacy he left behind. Starring Jaafar Jackson.',
                'director' => 'Antoine Fuqua',
                'poster_url' => 'https://m.media-amazon.com/images/M/MV5BYmM2MmNmM2QtMjJhNS00MTEyLTkzOWQtNjI4YjE3MGY3NGIwXkEyXkFqcGc@._V1_QL75_UX492_.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=3zOLzsbOleM',
            ],
            [
                'title' => 'How to Make a Killing',
                'slug' => 'how-to-make-a-killing',
                'genre' => 'Crime Comedy',
                'release_date' => '2025-08-22',
                'logline' => 'Murder is easy. The paperwork is murder.',
                'synopsis' => 'A dark comedy starring Glen Powell about a charismatic grifter who accidentally stumbles his way into becoming a high-profile hitman, and the chaotic fallout that ensues.',
                'director' => 'TBA',
                'poster_url' => 'https://m.media-amazon.com/images/M/MV5BNmExYjQzYTktMDE0Yi00YzUyLWJjOTctMGI2NDdhZjYxZWNkXkEyXkFqcGc@._V1_FMjpg_UX2160_.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=BxBof_p3_es',
            ],
        ];

        foreach ($films as $film) {
            Film::create($film);
        }

        Subscriber::create(['email' => 'partners@lumierehouse.com']);
        Subscriber::create(['email' => 'press@lumierehouse.com']);
    }
}