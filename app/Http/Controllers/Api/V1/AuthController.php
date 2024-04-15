<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{

    /**
     * @OA\Post(
     *      path="/login",
     *      summary="Login",
     *      tags={"Auth"},
     *
     *      @OA\Parameter(name="email", in="query", @OA\Schema(type="string", default="admin@gmail.com")),
     *      @OA\Parameter(name="phone", in="query", @OA\Schema(type="string", default="0123456789")),
     *      @OA\Parameter(name="password", in="query", @OA\Schema(type="string", default="12345678")),
     *
     *      @OA\Response(response=200, description="OK", @OA\JsonContent())
     * )
     */
    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required|regex:/(0)[0-9]{9}/',
            'password' => 'required',
        ]);

        $user = User::checkUser($request);

        if (!$user) {
            return response([
                'error' => __('auth.user_password_incorrect'),
            ], 422);
        }
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * @OA\Post(
     *      path="/logout",
     *      summary="Logout",
     *      tags={"Auth"},
     *      security={ {"sanctum": {} }},
     *
     *      @OA\Response(response=200, description="OK", @OA\JsonContent())
     * )
     */
    public function logout()
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true,
        ]);
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'password_new' => 'required|min:6|different:password',
            'password_new_confirm' => 'required_with:password|same:password_new',
        ]);

        if ($validator->fails()) {
            return $this->responseApiError($validator->errors()->first(), $validator->errors());
        }

        $user = $request->user();
        if (!Hash::check($request->password, $user->password)) {
            return $this->responseApiError(__('auth.old_password_not_match'));
        }

        //Update the new Password
        User::where('userid', strval($user->userid))->update([
            'password' => Hash::make($request->password_new),
        ]);

        return $this->responseApiSuccess(['user' => $user]);
    }

    public function getUser(Request $request)
    {
        $user = $request->user();
        $setting = $user->setting->value;

        return $this->responseApiSuccess(['user' => $user, 'setting' => $setting]);
    }
}
