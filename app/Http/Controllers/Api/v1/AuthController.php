<?php

namespace App\Http\Controllers\Api\v1;

use App\Services\UserService;
use App\Services\AuthService;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;

class AuthController extends Controller
{
    /** @var \App\Services\AuthService */
    protected $authService;

    /** @var \App\Services\UserService */
    protected $userService;

    public function __construct(AuthService $authService, UserService $userService) {
        $this->authService = $authService;
        $this->userService = $userService;
        $this->middleware('auth:api', ['except' => ['register', 'login']]);
    }

    /**
     * @param RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUserRequest $request) {
        return $this->userService->register($request);
    }

    /**
     * @param LoginUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginUserRequest $request) {
        return $this->authService->attemptLogin($request);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        return $this->authService->attemptLogout();
    }
}
