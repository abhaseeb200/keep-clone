<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
// use Illuminate\Support\Str;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',            
        ]);
    }

    public function login(Request $request) {
        // $credentials = $request->validate([
        //     'email' => 'required|string|email',
        //     'password' => 'required|string',
        // ]);

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $credentials = $request->only('email', 'password');
        if (!auth()->attempt($credentials)) {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->only(['name', 'email', 'created_at']),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function forgotPassword(Request $request) {
        $request->validate(['email' => 'required|email']);
 
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Email not found.'], 404);
        }

        $status = Password::sendResetLink($request->only('email'));
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Password reset link sent to your email.'], 200);
        }
        
        return response()->json(['message' => __($status)], 500);
    }

    public function resetPassword(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|string|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),

            function (User $user, string $password) {
                // $user->forceFill([
                //     'password' => Hash::make($password)
                // ])->setRememberToken(Str::random(60));
                $user->password = Hash::make($password);
                $user->save();
                // event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            // return response()->json(['message' => __($status)], 200);
            return response()->json(['message' => 'Password has been reset successfully.'], 200);
        }

        return response()->json(['message' => 'Failed to reset password.'], 500);
        // response()->json(['error' => __($status)], 422);
    }
}
