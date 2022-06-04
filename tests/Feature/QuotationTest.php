<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class QuotationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_store_quotation() {
        $user = User::factory()->create();
        $this->assertDatabaseHas('users', ['email' => $user->email]);

        $response = $this
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('Accept', 'application/json')
            ->json('POST', '/api/v1/auth/login', [
                'email' => $user->email,
                'password' => '12345',
            ]);
        $content = json_decode($response->getContent());

        $response = $this
            ->withHeader('Authorization', "Bearer {$content->data->access_token}")
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('Accept', 'application/json')
            ->json('POST', '/api/v1/quotations', [
                'age' => '18,31',
                'currency_id' => 'EUR',
                'start_date' => '2020-10-01',
                'end_date' => '2020-10-30',
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'data' => [
                    'total' => "117.00",
                    'currency_id' => 'EUR',
                    'quotation_id' => 1
                ],
                'success' => true,
                'message' => 'Quotation created successfully'
            ]);

        $this->assertDatabaseHas('quotations', ['age' => '18,31']);
    }
}
