<?php

namespace App\Http\Resources;

use App\Enums\MediaCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleDocumentResource extends JsonResource
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
            'effective_date' => $this->effective_date,
            'expiration_date' => $this->expiration_date,
            'notice_duration' => $this->notice_duration,
            'fees' => $this->fees,
            'note' => $this->note,
            'images' => $this->getMedia(MediaCollection::IMAGE->value),
            'addable_files' => $this->getMedia(MediaCollection::DOCUMENT->value),
        ];
    }
}
