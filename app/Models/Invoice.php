<?php

namespace App\Models;

use App\Enums\CommandMobileStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Invoice extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'product_type', 'carrier_id', 'carrier_number', 'time_transport', 'booking_id',
        'time_down_the_line', 'method_command', 'method_command_number', 'booking_code',
        'driver_salary', 'km', 'cont_type', 'is_1_axle_vehicle',
        'is_2_axle_vehicle', 'cont_salary', 'route_salary', 'price',
        'commission', 'quantity', 'status', 'location_start', 'location_end'
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function commandMobiles()
    {
        return $this->hasMany(CommandMobile::class);
    }

    public function taskTransports()
    {
        return $this->hasOne(InvoiceTaskTransport::class);
    }

    public function trips()
    {
        return $this->hasMany(InvoiceTrip::class);
    }

    public function carrier()
    {
        return $this->belongsTo(Carrier::class);
    }

    public function conts()
    {
        return $this->hasMany(Cont::class);
    }

    protected function priceCalculated(): Attribute
    {
        return Attribute::make(
            get: fn ($value, array $attributes) => $attributes['price'],
        );
    }

    public function reUpdatePrice()
    {
        $totalPrice = $this->commandMobiles()->where('status', '!=', CommandMobileStatus::CANCEL->value)->sum('price');
        return $this->update([
            'price' => $totalPrice,
        ]);
    }
}
