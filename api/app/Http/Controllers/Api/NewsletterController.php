<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubscriberRequest;
use App\Services\NewsletterService;
use Illuminate\Http\JsonResponse;

class NewsletterController extends Controller
{
    public function __construct(private readonly NewsletterService $newsletterService)
    {
    }

    public function store(StoreSubscriberRequest $request): JsonResponse
    {
        $this->newsletterService->subscribe($request->validated('email'));

        return response()->json([
            'message' => 'Successfully added to the guestlist.'
        ], 201);
    }
}