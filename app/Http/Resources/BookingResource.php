<?php

namespace App\Http\Resources;

use App\Enums\MediaCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
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
            'is_home_vehicle' => $this->is_home_vehicle,
            'fee_transport_type' => $this->fee_transport_type,
            'customer_id' => $this->customer_id,
            'customer' => $this->customer,
            'route_id' => $this->route_id,
            'route' => $this->route,
            'is_has_partner' => $this->is_has_partner,
            'partner_id' => $this->partner_id,
            'partner' => $this->partner,
            'partner_cont_quantity' => $this->partner_cont_quantity,
            'partner_cont_type' => $this->partner_cont_type,
            'partner_price' => $this->partner_price,
            'partner_note' => $this->partner_note,
            'created_at' => $this->created_at,
            'maker' => $this->maker,

            'invoice' => new InvoiceResource($this->invoice),
        ];
    }
}
