<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login (LoginRequest $request) {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials,false)){
            return response([
               'error'=> 'The Provided credentials are not correct'
            ],404);
        }
        $user=Auth::user();
        $token= $user->createToken('main')->plainTextToken;
        return response([
            'user'=> $user,
            'token'=>$token
        ]);
    }
    public function signup(SignupRequest $request) {
        $data=$request->validated();
        /** @var \App\Models\User $user */
        $user=User::create([
           'name'=> $data['name'],
           'email'=> $data['email'],
           'password'=> bcrypt($data['password'])
        ]);
        $token= $user->createToken('main')->plainTextToken;
        return response([
            'user'=> $user,
            'token'=>$token
        ]);
    }
    public function logout(){
        /** @var User $user */
        $user =Auth::user();
        $user->currentAccessToken()->delete();
        return response([
           'success'=>true
        ]);
    }
    public function me(Request $request){
        return $request->user();
    }

}
