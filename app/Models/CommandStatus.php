<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CommandStatus extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'command_mobile_id', 'user_id', 'status', 'properties',
    ];

    public function commandMobile()
    {
        return $this->belongsTo(commandMobile::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
