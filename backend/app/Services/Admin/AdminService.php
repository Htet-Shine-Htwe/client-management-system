<?php

namespace App\Services\Admin;

use App\Enums\RoleEnum;
use App\Http\Requests\CreateAdminRequest;
use App\Models\User;

class AdminService
{
    public function __construct()
    {
        //
    }

    public function getAdmins()
    {
        return User::role(enum_value(RoleEnum::ADMIN))->paginate(10);
    }

    public function getAdmin(User $user) : User
    {
        return $user;
    }

    public function createAdmin(CreateAdminRequest $request) : User
    {
        $user = User::create($request->validated());
        $user->assignRole(enum_value(RoleEnum::ADMIN));

        return $user;
    }

    public function updateAdmin(User $user, CreateAdminRequest $request) : User
    {
        $user->update($request->validated());
        return $user;
    }

    public function deleteAdmin(User $user) : bool
    {
        return $user->delete();
    }
}
