<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

trait AuthenticatedWithCode
{
        /**
         * Attempt to log the user in with code and password, and return a Sanctum token.
         *
         * @param \Illuminate\Http\Request $request
         * @return \Illuminate\Http\JsonResponse
         */
        public function loginWithCode(Request $request)
        {
            $this->validateLogin($request);

            // Attempt to authenticate the user
            if ($this->attemptLogin($request)) {
                return $this->sendLoginResponse($request);
            }

            // If the login attempt was unsuccessful, send back a failed response
            return $this->sendFailedLoginResponse($request);
        }

        /**
         * Validate the user login request.
         *
         * @param \Illuminate\Http\Request $request
         * @return void
         */
        protected function validateLogin(Request $request)
        {
            $request->validate([
                'code' => 'required|string',
                'password' => 'required|string',
            ]);
        }

        /**
         * Attempt to log the user into the application.
         *
         * @param \Illuminate\Http\Request $request
         * @return bool
         */
        protected function attemptLogin(Request $request)
        {
            return Auth::attempt(
                $this->credentials($request)
            );
        }

        /**
         * Get the needed authorization credentials from the request.
         *
         * @param \Illuminate\Http\Request $request
         * @return array
         */
        protected function credentials(Request $request)
        {
            return [
                'code' => $request->input('code'),
                'password' => $request->input('password')
            ];
        }

        /**
         * Send the response after the user was authenticated.
         *
         * @param \Illuminate\Http\Request $request
         * @return \Illuminate\Http\JsonResponse
         */
        protected function sendLoginResponse(Request $request)
        {
            $token = Auth::user()->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'user' => Auth::user(),
                'token' => $token,
            ]);
        }

        /**
         * Get the failed login response instance.
         *
         * @param \Illuminate\Http\Request $request
         * @return \Illuminate\Http\JsonResponse
         *
         * @throws \Illuminate\Validation\ValidationException
         */
        protected function sendFailedLoginResponse(Request $request)
        {
            throw ValidationException::withMessages([
                'code' => [trans('auth.failed')],
            ]);
        }

        /**
         * Log the user out of the application and revoke the token.
         *
         * @param \Illuminate\Http\Request $request
         * @return \Illuminate\Http\JsonResponse
         */
        public function logout(Request $request)
        {
            auth()->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Logged out successfully.']);
        }
}
