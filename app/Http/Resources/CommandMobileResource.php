<?php

namespace App\Http\Resources;

use App\Enums\MediaCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommandMobileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->invoice->carrier;
        return [
            'id' => $this->id,
            'booking_id' => $this->booking_id,
            'booking' => $this->booking,
            'invoice_id' => $this->invoice_id,
            'invoice' => $this->invoice,
            'driver_id' => $this->driver_id,
            'driver' => $this->driver?->user->name,
            'drivers_infor' => $this->driver?->user,
            'route_id' => $this->route_id,
            'route' => $this->route,
            'romooc_id' => $this->romooc_id,
            'romooc' => $this->romooc?->serial,
            'vehicle_id' => $this->vehicle_id,
            'vehicle' => $this->vehicle?->plate,
            'quantity' => $this->quantity,
            'product_type' => $this->product_type,
            'advance_money' => $this->advance_money,
            'bonus_driver_money' => $this->bonus_driver_money,
            'salary_total' => $this->salary_total,
            'anchor_vehicle' => $this->anchor_vehicle,
            'cont_cut' => $this->cont_cut,
            'price' => $this->price,
            'status' => $this->status,

            'incurreds' => CommandMobileIncurredResource::collection($this->incurreds),
            'conts' => $this->conts,
            'route' => $this->route,
            'customer' => $this->booking->customer,

            'statuses' => CommandStatusResource::collection($this->statuses),
        ];
    }
}
