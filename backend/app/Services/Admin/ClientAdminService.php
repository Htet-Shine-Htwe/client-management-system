<?php

namespace App\Services\Admin;

use App\Models\Client;
use App\Models\User;

class ClientAdminService
{
    public static function assignClient(Client $client,User $admin)
    {
        $client->user_id = $admin->id;
        $client->save();

        return $client;
    }
}
