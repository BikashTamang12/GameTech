<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * User / Admin Login.
     */
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        if (empty($email) || empty($password)) {
            return response()->json([['result' => 'email password required']], 400);
        }

        $user = Customer::where('email', $email)->first();

        if (!$user) {
            return response()->json([['result' => 'wrong email']]);
        }

        // Support plain text (from legacy backend) or bcrypt
        $passwordMatches = ($user->password === $password) || Hash::check($password, $user->password);

        if ($passwordMatches) {
            $token = $user->createToken('auth-token')->plainTextToken;

            if (strtolower($user->Role) === 'admin') {
                $resp = [
                    'result' => 'Admin Login successful',
                    'id' => $user->id,
                    'token' => $token,
                    'role' => 'admin',
                ];
                return response()->json([$resp]);
            }

            $resp = [
                'result' => 'Login successful',
                'id' => $user->id,
                'token' => $token,
                'role' => $user->Role ?? 'user',
            ];
            return response()->json([$resp]);
        }

        return response()->json([['result' => 'wrong password']]);
    }

    /**
     * User Registration.
     */
    public function register(Request $request)
    {
        $username = trim($request->input('username', ''));
        $address = trim($request->input('address', ''));
        $phone = trim($request->input('phone', $request->input('phonenumber', '')));
        $email = trim($request->input('email', ''));
        $password = trim($request->input('password', ''));

        if (empty($email) || empty($password) || empty($username)) {
            return response()->json(['success' => false, 'message' => 'check data!']);
        }

        $existingUser = Customer::where('email', $email)->first();
        if ($existingUser) {
            return response()->json([
                'success' => false,
                'message' => 'Email already exists try new email!'
            ]);
        }

        $customer = Customer::create([
            'username' => $username,
            'address' => $address,
            'phonenumber' => $phone,
            'email' => $email,
            'password' => $password,
            'Role' => 'user',
        ]);

        if ($customer) {
            return response()->json(['success' => 'sucessful regestration']);
        }

        return response()->json(['success' => 'check data!']);
    }

    /**
     * Get All Users (Legacy user.php GET behavior).
     */
    public function getUsers()
    {
        $customers = Customer::all();

        if ($customers->isEmpty()) {
            return response()->json(['result' => 'no data']);
        }

        $data = $customers->map(function ($row) {
            return [
                'id' => $row->id,
                'username' => $row->username,
                'address' => $row->address,
                'phonenumber' => $row->phonenumber,
                'email' => $row->email,
                'password' => $row->password,
            ];
        });

        return response()->json($data);
    }

    /**
     * Forgot Password.
     */
    public function forgotPassword(Request $request)
    {
        $email = $request->input('email');
        $phone = $request->input('phone');
        $newPassword = $request->input('newPassword');

        if (empty($email) || empty($phone) || empty($newPassword)) {
            return response()->json(['result' => '*Email, phone number and new password are required.']);
        }

        $user = Customer::where('email', $email)->first();

        if (!$user) {
            return response()->json(['result' => '*Wrong email!!!']);
        }

        if (trim($user->phonenumber) !== trim($phone)) {
            return response()->json(['result' => '*Wrong phone number!!!']);
        }

        $user->password = $newPassword;
        $user->save();

        return response()->json(['result' => 'Password updated successfully!']);
    }
}
