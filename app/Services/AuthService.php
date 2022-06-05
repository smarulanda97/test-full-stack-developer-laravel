<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginUserRequest;
use App\Http\Traits\StandardizedResponse;

class AuthService {

    use StandardizedResponse;

    /**
     * Logs the user in
     *
     * @param LoginUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function attemptLogin(LoginUserRequest $request) {
        if (!Auth::attempt($request->validated())) {
            return $this->responseJson([], 404, 'Invalid username or password', false);
        }

        return $this->responseJson([
            'token_type' => 'bearer',
            'access_token' => Auth::user()->createToken('authToken')->accessToken,
            'user' => new UserResource(Auth::user())
        ], 200, 'Login successful');
    }

    /**
     * Logs the user out
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function attemptLogout() {
        $user = Auth::guard("api")->user()->token();
        $user->revoke();

        return $this->responseJson([], 200, 'Logged out successful');
    }
}
