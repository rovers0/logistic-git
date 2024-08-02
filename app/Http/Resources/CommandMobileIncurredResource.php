<?php

namespace App\Http\Resources;

use App\Enums\MediaCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommandMobileIncurredResource extends JsonResource
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
            'command_mobile_id' => $this->command_mobile_id,
            'money' => $this->money,
            'customer_money' => $this->customer_money,
            'fee_id' => $this->fee_id,
            'note' => $this->note,
            'invoice_date' => $this->invoice_date,
            'invoice_code' => $this->invoice_code,
            'incurred_from' => $this->incurred_from,
            'customer_collect' => $this->customer_collect,
            'is_no_need_confirm' => $this->is_no_need_confirm,
            'status' => $this->status,

            'confirm_at' => $this->confirm_at,
            'confirm_by_user_id' => $this->confirm_by_user_id,

            'fee' => $this->fee,
            'comfirm_user' => $this->comfirmUser,

            'images' => $this->getMedia(MediaCollection::COMMAND_MOBILE_INCURRED_IMAGES->value),
        ];
    }
}
