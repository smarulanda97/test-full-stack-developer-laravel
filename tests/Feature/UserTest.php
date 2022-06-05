<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Checks that token is returned when send valid credentials
     * to the endpoint /api/v1/auth/login
     *
     * @return void
     */
    public function test_login_user_valid_credentials() {
        $user = User::factory()->create();
        $this->assertDatabaseHas('users', ['email' => $user->email]);

        $response = $this
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('Accept', 'application/json')
            ->json('POST', '/api/v1/auth/login', [
                'email' => $user->email,
                'password' => '12345',
            ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => ['access_token', 'token_type', 'user' => [
                    'name', 'email', 'created_at', 'updated_at'
                ]]
            ]);
    }

    /**
     * Checks that token is not returned when send invalid user credentials
     * to the endpoint /api/v1/auth/login
     *
     * @return void
     */
    public function test_login_user_invalid_credentials() {
        $response = $this
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('Accept', 'application/json')
            ->json('POST', '/api/v1/auth/login', [
            'email' => "invaliduser@gmail.com",
            'password' => '123475',
        ]);
        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Invalid username or password',
                'data' => [],
            ]);
    }

    /**
     * Checks logs the user out with Bearer token
     *
     * @return void
     */
    public function test_logout_user() {
        $user = User::factory()->create();
        $this->assertDatabaseHas('users', ['email' => $user->email]);

        $response = $this->json('POST', '/api/v1/auth/login', [
            'email' => $user->email,
            'password' => '12345',
        ]);

        $content = json_decode($response->getContent());
        $response = $this
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('Accept', 'application/json')
            ->withHeader('Authorization', "Bearer {$content->data->access_token}")
            ->json('POST', '/api/v1/auth/logout');
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Logged out successful',
                'data' => [],
            ]);
    }
}
