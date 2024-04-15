<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Romooc extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    protected $fillable = [
        'serial', 'frame_number', 'weight',
        'size', 'type', 'axis',
        'note', 'packing_id'
    ];

    public function scopeIndex($query, $request)
    {
        return $query
            ->when($request->has('serial'), function ($q) use ($request) {
                return $q->whereIn('serial', $request->serial);
            })
            ->when($request->has('parkingLot'), function ($q) use ($request) {
                return $q->where('packing_id', $request->parkingLot);
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

    public function packing()
    {
        return $this->belongsTo(Packing::class);
    }
}
