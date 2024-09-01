<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateAdminRequest;
use App\Models\User;
use App\Services\Admin\AdminService;

class SuperAdminController extends Controller {
    public function __construct( protected AdminService $adminService ) {

    }

    public function index() {
        $admins = $this->adminService->getAdmins();
        return response()->json( [
            'message' => 'Admins fetched successfully',
            'data' => $admins
        ] );
    }

    public function store( CreateAdminRequest $request ) {
        try {
            $request->validate( [
                'code' => 'unique:users,code'
            ] );
            $admin = $this->adminService->createAdmin( $request );
            return response()->json( [
                'message' => 'Admin created successfully',
                'data' => $admin
            ] );
        } catch( \Exception $e ) {
            return response()->json( [
                'message' => 'Admin creation failed',
                'error' => $e->getMessage()
            ], 500 );
        }

    }

    public function show( User $admin ) {
        $admin = $this->adminService->getAdmin( $admin );
        return response()->json( [
            'message' => 'Admin fetched successfully',
            'data' => $admin
        ] );
    }

    public function update( CreateAdminRequest $request, User $admin ) {
        try {
            $request->validate( [
                'code' => 'unique:users,code,'.$admin->id
            ] );

            $admin = $this->adminService->updateAdmin( $admin, $request );
            return response()->json( [
                'message' => 'Admin updated successfully',
                'data' => $admin
            ] );
        } catch( \Exception $e ) {
            return response()->json( [
                'message' => 'Admin update failed',
                'error' => $e->getMessage()
            ], 500 );
        }
    }

    public function destroy( User $admin ) {
        $this->adminService->deleteAdmin( $admin );
        return response()->json( [
            'message' => 'Admin deleted successfully'
        ] );
    }
}
