<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email', 'password', 'email_verified_at',
        'remember_token', 'phone', 'role', 'allowed',
        'setting', 'account',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function isAdmin()
    {
        return $this->role & UserRole::ADMIN->value;
    }

    public function isDriver()
    {
        return $this->role & UserRole::DRIVER->value;
    }

    public static function checkUser($request)
    {
        $user = self::where('phone', $request->phone)->first();
        if (!$user) {
            return false;
        }
        if (!Hash::check($request->password, $user->makeVisible(['password'])->password)) {
            return false;
        }
        $user->makeHidden(['password']);
        return $user;
    }

    public function setting()
    {
        return $this->belongsTo(Setting::class, 'id', 'user_id');
    }

    public function driver()
    {
        return $this->hasOne(Driver::class);
    }
}
