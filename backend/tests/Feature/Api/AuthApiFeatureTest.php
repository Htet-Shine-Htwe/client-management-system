<?php

use App\Models\User;
use Tests\Support\UserAuthenticated;

uses()->group('api', 'api-auth');

uses(UserAuthenticated::class);

it('user body request validation', function () {
    $response = $this->postJson(route('api.login'), [
        'code' => '',
        'password' => '',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['code', 'password']);
});

it('return bearer token when successful login',function(){
    $user = User::factory()->create([
        'password' => bcrypt('password')
    ]);

    $response = $this->postJson(route('api.login'), [
        'code' => $user->code,
        'password' => 'password',
    ]);

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'message',
        'user',
        'token'
    ]);
    $response->assertJsonFragment([
        'message' => 'Login successful',
        'user' => $user->toArray()
    ]);
    $this->assertAuthenticated();
});

it("user can get profile response with role",function(){
    $user = User::factory()->create();
    $response = $this->authenticated($user)->getJson(route('api.me'));

    $response->assertStatus(200);
    $response->assertJson($user->toArray());
});

it("profile will return 401 when user not authenticated",function(){
    $response = $this->getJson(route('api.me'));

    $response->assertStatus(401);
});

it("user can logout",function(){
    $user = User::factory()->create();
    $response = $this->authenticated($user)->postJson(route('api.logout'));

    $response->assertStatus(200);
});
