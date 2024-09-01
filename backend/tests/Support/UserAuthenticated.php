<?php

namespace Tests\Support;
use App\Enum\AdminRole;
use App\Models\User;
use App\Models\Admin;
use Database\Seeders\AdminPermissionSeeder;
use Illuminate\Contracts\Auth\Authenticatable;

trait UserAuthenticated
{
    private User $user;


    public function setupUser(array $body = [])
    {
        $this->user = User::factory()->create($body);
        return $this->authenticated($this->user);
    }

    public function authenticated(User $user = null)
    {
        return $this->actingAs($user ?? $this->user,'sanctum');
    }


}
