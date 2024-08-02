<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class VehicleDocument extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'document_type',
        'registration_date',
        'effective_date',
        'expiration_date',
        'notice_duration',
        'fees',
        'note',
    ];

    public function documentable()
    {
        return $this->morphTo();
    }
}
