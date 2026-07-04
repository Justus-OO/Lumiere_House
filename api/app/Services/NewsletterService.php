<?php

namespace App\Services;

use App\Models\Subscriber;

class NewsletterService
{
    public function subscribe(string $email): Subscriber
    {
        return Subscriber::firstOrCreate(['email' => $email]);
    }
}