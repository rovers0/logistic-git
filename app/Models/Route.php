<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'name', 'km', 'cont_type',
        'is_1_axle_vehicle', 'is_2_axle_vehicle',
        'cont_salary', 'route_salary', 'price', 'commission', 'quantity',
    ];
}
