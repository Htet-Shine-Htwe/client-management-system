<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignClientRequest;
use App\Models\Client;
use App\Models\User;
use App\Services\Admin\ClientAdminService;
use Illuminate\Http\Request;

class ClientController extends Controller
{

    public function __construct(protected ClientAdminService $clientAdminService)
    {

    }
    public function index()
    {
        $clients = Client::when(auth()->user()->hasRole('admin'), function ($query) {
            return $query->where('user_id', auth()->id());
        })->paginate(10);
        return response()->json([
            'message' => 'Clients fetched successfully',
            'data' => $clients
        ]);
    }

    public function assignClient(AssignClientRequest $request)
    {
        $client = $this->clientAdminService->assignClient(
            Client::findOrFail($request->client_id),
            User::where('code', $request->code)->firstOrFail()
        );
        return response()->json([
            'message' => 'Client assigned successfully',
            'data' => $client
        ]);
    }
}
