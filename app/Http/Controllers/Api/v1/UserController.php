<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;

class UserController extends Controller
{
    /** @var \App\Models\User $user */
    protected $user;

    public function __construct() {
        $this->user = new User();
        $this->middleware('auth:api', [
            'except' => ['register', 'login']
        ]);
    }

    /**
     * Registers a new user
     *
     * @param RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUserRequest $request) {
        $data = [
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password'))
        ];

        $this->user->create($data);

        return $this->responseJson([], 201, 'User registered successfully');
    }

    /**
     * Logs the user in
     *
     * @param LoginUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginUserRequest $request) {
        if (!Auth::attempt($request->validated())) {
            return $this->responseJson([], 404, 'Invalid username or password', false);
        }

        $accessToken = Auth::user()->createToken('authToken')->accessToken;

        return $this->responseJson(['access_token' => $accessToken, 'token_type' => 'bearer'], 200, 'Login successful');
    }

    /**
     * Logs the user out
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        $user = Auth::guard("api")->user()->token();
        $user->revoke();

        return $this->responseJson([], 200, 'Logged out successful');
    }
}
