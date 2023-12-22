<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    //
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = request(['username', 'password']);

        if (Auth::attempt($credentials)) {
            // $request->session()->regenerate();
            return response()->json([
                'message' => 'Successfully logged in',
            ],200);
        }

        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }

    public function checkAuth()
    {
        if (Auth::check()) {
            return response()->json([
                'message' => 'Authorized',
                "user" => Auth::user()
            ], 200);
        }
        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }

    public function logout(Request $request)
    {
        // logout
        Auth::logout();

        return response()->json([
            'message' => 'Successfully logged out',
        ], 200);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|confirmed|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(["message"=>"Success Add", "User"=>$user], 200);
    }
}
