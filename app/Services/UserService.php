<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Traits\StandardizedResponse;
use App\Http\Requests\RegisterUserRequest;

class UserService {

    use StandardizedResponse;

    /**
     * Registers a new user
     *
     * @param RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUserRequest $request) {
        $user = new User();
        $user->fill([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password'))
        ]);
        $user->save();

        return $this->responseJson([], 201, 'User registered successfully');
    }
}
