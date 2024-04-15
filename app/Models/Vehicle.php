<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Vehicle extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;
    protected $table = 'vehicles';
    protected $fillable = [
        'plate', 'axle', 'mooc', 'type', 'parking_lot', 'chassis', 'seri', 'note', 'image', 'attachment'
    ];

    public function scopeIndex($query, $request)
    {
        return $query
            ->when($request->has('plate'), function ($q) use ($request) {
                return $q->whereIn('plate', $request->plate);
            })
            ->when($request->has('parkingLot'), function ($q) use ($request) {
                return $q->where('parking_lot', $request->parkingLot);
            })
            ->when($request->has('axle'), function ($q) use ($request) {
                return $q->where('axle', $request->axle);
            })
            ->orderBy('id', 'DESC');
    }

    public function drivers()
    {
        return $this->belongsToMany(Driver::class);
    }

    public function driver()
    {
        return $this->drivers->first();
    }

    public function romoocs()
    {
        return $this->belongsToMany(Romooc::class);
    }

    public function romooc()
    {
        return $this->romoocs->first();
    }

    public function packing()
    {
        return $this->belongsTo(Packing::class, 'parking_lot');
    }
}
