<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceTaskTransport extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id', 'get_null_point', 'get_null_point_request',
        'shipping_point', 'shipping_point_request',
        'return_null_point', 'return_null_point_request',
        'note',
    ];
}
