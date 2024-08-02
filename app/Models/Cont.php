<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cont extends Model
{
    use HasFactory;

    protected $fillable = [
        'command_mobile_id', 'invoice_id', 'code', 'seal', 'gross'
    ];

    public function commandMobile()
    {
        return $this->belongsTo(CommandMobile::class);
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
