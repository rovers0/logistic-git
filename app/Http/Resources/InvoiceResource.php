<?php

namespace App\Http\Resources;

use App\Enums\MediaCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_type' => $this->product_type,
            'carrier_id' => $this->carrier_id,
            'carrier_number' => $this->carrier_number,
            'time_transport' => $this->time_transport,
            'time_down_the_line' => $this->time_down_the_line,
            'method_command' => $this->method_command,
            'method_command_number' => $this->method_command_number,
            'driver_salary' => $this->driver_salary,
            'booking_code' => $this->booking_code,

            'drivers' => $this->drivers,
            'conts' => $this->conts,
            'taskTransports' => $this->taskTransports,
            'trips' => $this->trips,
            'carrier' => $this->carrier,
            'location_start' => $this->location_start,
            'location_end' => $this->location_end,

            'km' => $this->km,
            'cont_type' => $this->cont_type,
            'is_1_axle_vehicle' => $this->is_1_axle_vehicle,
            'is_2_axle_vehicle' => $this->is_2_axle_vehicle,
            'cont_salary' => $this->cont_salary,
            'route_salary' => $this->route_salary,
            'price' => $this->price,
            'price_calculated' => $this->price_calculated,
            'commission' => $this->commission,
            'quantity' => $this->quantity,
            'status' => $this->status,

            'images' => $this->getMedia(MediaCollection::IMAGE->value),
            'addable_files' => $this->getMedia(MediaCollection::DOCUMENT->value),

            'command_mobiles' =>  CommandMobileResource::collection($this->commandMobiles)
        ];
    }
}
