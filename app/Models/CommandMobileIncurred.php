<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CommandMobileIncurred extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, SoftDeletes;

    // lệnh điều động có nhiều phí phát sinh

    protected $fillable = [
        'command_mobile_id', 'money', 'customer_money', 'fee_id',
        'note', 'invoice_date', 'invoice_code', 'incurred_from',
        'customer_collect', 'status', 'confirm_at', 'confirm_by_user_id',
        'is_no_need_confirm',
    ];

    public function scopeIndex($query, $request)
    {
        return $query->with(['fee']);
    }

    public function commandMobile()
    {
        return $this->belongsTo(CommandMobile::class);
    }

    public function comfirmUser()
    {
        return $this->belongsTo(User::class, 'confirm_by_user_id');
    }

    public function fee()
    {
        return $this->belongsTo(Fees::class);
    }
}
