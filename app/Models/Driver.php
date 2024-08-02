<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Driver extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    protected $fillable = [
        'user_id', 'vehicle_id', 'birthday', 'bith_place', 'passport',
        'relative_phone', 'relative_name', 'salary', 'allowance', 'insurance',
        'commission_percent', 'experient_year', 'license_class', 'license',
        'license_expired_date', 'save_date', 'receive_user_id', 'receive_date',
        'release_date', 'start_date', 'end_date',
    ];

    public function scopeIndex($query, $request)
    {
        return $query->with('vehicles')
            ->when($request->has('input'), function ($q) use ($request) {
                return $q->whereHas('user', function ($q) use ($request) {
                    $q->where('name', 'like', "%$request->input%")
                    ->orWhere('phone', 'like', "%$request->input%")
                    ->orWhere('email', 'like', "%$request->input%");
                })->orWhereHas('vehicles', function ($q) use ($request) {
                    $q->where('plate', 'like', "%$request->input%");
                });
            })
            ->when($request->has('status'), function ($q) use ($request) {
                return $q->where('status', $request->status);
            })
            ->orderBy('id', 'DESC');
    }

    public function vehicles()
    {
        return $this->belongsToMany(Vehicle::class);
    }

    public function vehicle()
    {
        return $this->vehicles->first;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicleMobilization()
    {
        return $this->hasMany(CommandMobile::class);
    }
}
