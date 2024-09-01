<?php

use App\Enums\RoleEnum;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Tests\Support\UserAuthenticated;

uses()->group('api', 'api-super-admin');

uses(UserAuthenticated::class);

beforeEach(function(){
    $this->user = User::factory()->create();
});

it("Super admin can see the list of admins",function(){

    $this->user->assignRole(enum_value(RoleEnum::SUPER_ADMIN));

    $admin_users_count = 10;

    User::factory()->count($admin_users_count)->create()->each(function($user){
        $user->assignRole(enum_value(RoleEnum::ADMIN));
    });

    $response = $this->authenticated($this->user)->getJson(route('api.super-admin.index'));

    $response->assertJsonCount($admin_users_count, 'data.data');

    $response->assertStatus(200);
});

it("non-super admin can't access the page",function(){

        $this->user->assignRole(enum_value(RoleEnum::ADMIN));

        $response = $this->authenticated($this->user)->getJson(route('api.super-admin.index'));

        $response->assertStatus(403);
});

it("admin body request validation on create admin",function(){

    $this->user->assignRole(enum_value(RoleEnum::SUPER_ADMIN));

    $response = $this->authenticated($this->user)->postJson(route('api.super-admin.store'), [
        'code' => '',
        'name' => '',
        'email' => '',
        'password' => '',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['code', 'name', 'password']);
});

it("super admin can create admin",function(){

    $this->user->assignRole(enum_value(RoleEnum::SUPER_ADMIN));

    $response = $this->authenticated($this->user)->postJson(route('api.super-admin.store'), [
        'code' => 'admin',
        'name' => 'admin',
        "password" => "password",
    ]);

    $response->assertStatus(200);
    $response->assertJsonFragment([
        'message' => 'Admin created successfully',
    ]);
});

it("super admin can see the admin detail",function(){

    $this->user->assignRole(enum_value(RoleEnum::SUPER_ADMIN));

    $admin = User::factory()->create();
    $admin->assignRole(enum_value(RoleEnum::ADMIN));

    $response = $this->authenticated($this->user)->getJson(route('api.super-admin.show', $admin->id));

    $response->assertStatus(200);
    $response->assertJsonFragment([
        'message' => 'Admin fetched successfully',
    ]);
});

it("super admin can update admin",function(){

    $this->user->assignRole(enum_value(RoleEnum::SUPER_ADMIN));

    $admin = User::factory()->create();
    $admin->assignRole(enum_value(RoleEnum::ADMIN));

    $response = $this->authenticated($this->user)->putJson(route('api.super-admin.update', $admin->id), [
        'code' => 'admin',
        'name' => 'admin',
        "password" => "password",
    ]);

    $response->assertStatus(200);
    $response->assertJsonFragment([
        'message' => 'Admin updated successfully',
    ]);
});

it("super admin can delete admin",function(){

    $this->user->assignRole(enum_value(RoleEnum::SUPER_ADMIN));

    $admin = User::factory()->create();
    $admin->assignRole(enum_value(RoleEnum::ADMIN));

    $response = $this->authenticated($this->user)->postJson(route('api.super-admin.destroy', $admin->id));

    $response->assertStatus(200);
    $response->assertJsonFragment([
        'message' => 'Admin deleted successfully',
    ]);
});
