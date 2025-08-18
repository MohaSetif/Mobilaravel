<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_register(): void
    {
        $response = $this->postJson('/api/register', [
            "name" => "Khalil",
            "email" => "khalil@example.com",
            "password" => "password",
            "password_confirmation" => "password",
            "device_name" => "Test Device"
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                    'token'
                 ]);
    }

    public function test_login(): void
    {
        User::factory()->create([
            "name" => "Khalil",
            "email" => "khalil@example.com",
            "password" => bcrypt("password")
        ]);

        $response = $this->postJson('/api/login', [
            "email" => "khalil@example.com",
            "password" => "password",
            "device_name" => "Test Device"
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                    'token'
                 ]);
    }
}
