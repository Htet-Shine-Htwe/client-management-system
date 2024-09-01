<?php

use App\Enums\RoleEnum;
use App\Models\Client;
use App\Models\User;
use App\Services\Admin\ClientAdminService;
use Spatie\Permission\Models\Role;
use Tests\Support\UserAuthenticated;

uses()->group('api', 'client-admin-service');

uses(UserAuthenticated::class);

beforeEach(function(){
    User::factory(10)->create();
});

it("ClientAdminService Work Properly",function(){

    $admin = User::factory()->create();
    $admin->assignRole(enum_value(RoleEnum::ADMIN));

    $client = Client::factory()->create([
        'user_id' => null
    ]);

    ClientAdminService::assignClient($client,$admin);

    $admin_clients = $admin->clients()->get();

    $this->assertContains($admin->id, $admin_clients->pluck('user_id'));
});

it("SuperAdmin can see all the clients",function(){

        $super_admin = User::factory()->create();
        $super_admin->assignRole(enum_value(RoleEnum::SUPER_ADMIN));

        Client::factory()->count(10)->create();

        $response = $this->authenticated($super_admin)->getJson(route('api.client.index'));

        $response->assertJsonCount(10, 'data.data');

        $response->assertStatus(200);
});

it("Admin can see only his clients",function(){

    $admin = User::factory()->create();
    $admin->assignRole(enum_value(RoleEnum::ADMIN));

    Client::factory()->count(10)->create([
        'user_id' => $admin->id
    ]);

    $response = $this->authenticated($admin)->getJson(route('api.client.index'));

    $response->assertJsonCount(10, 'data.data');

    collect($response->json('data.data'))->each(function($client) use ($admin){
        $this->assertEquals($admin->id, $client['user_id']);
    });

    $response->assertStatus(200);
});

it("Super Admin can assign client to admin",function(){

        $super_admin = User::factory()->create();
        $super_admin->assignRole(enum_value(RoleEnum::SUPER_ADMIN));

        $admin = User::factory()->create();
        $admin->assignRole(enum_value(RoleEnum::ADMIN));

        $client = Client::factory()->create();

        $response = $this->authenticated($super_admin)->postJson(route('api.client.assign'),[
            'client_id' => $client->id,
            'code' => $admin->code
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('clients',[
            'id' => $client->id,
            'user_id' => $admin->id
        ]);
});

it("non-super admin can't assign client to admin",function(){
    $admin = User::factory()->create();
    $admin->assignRole(enum_value(RoleEnum::ADMIN));

    $client = Client::factory()->create();

    $response = $this->authenticated($admin)->postJson(route('api.client.assign'),[
        'client_id' => $client->id,
        'user_id' => $admin->id
    ]);

    $response->assertStatus(403);
});
