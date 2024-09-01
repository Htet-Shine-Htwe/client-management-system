<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginApiRequest;
use App\Traits\AuthenticatedWithCode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AuthApiController extends Controller
{
    use AuthenticatedWithCode;

    public function login(LoginApiRequest $request) : JsonResponse
    {
        return $this->loginWithCode($request);
    }

    public function me(Request $request) : JsonResponse
    {
        return response()->json($request->user());
    }

    public function logout(Request $request) : JsonResponse
    {
        auth()->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out']);
    }


}
