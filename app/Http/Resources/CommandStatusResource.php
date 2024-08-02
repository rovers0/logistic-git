<?php

namespace App\Http\Resources;

// use VehicleDocumentResource;
use App\Enums\MediaCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommandStatusResource extends JsonResource
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
            'user_id' => $this->user_id,
            'user' => $this->user,
            'properties' => $this->properties,
            'images' => $this->getMedia(MediaCollection::COMMAND_MOBILE_IMAGES->value),
        ];
    }

    function attachmentDocument($collection)
    {
        $documentResources = [];
        foreach ($collection as $item) {
            $documentResources[] = new VehicleDocumentResource($item);
        }

        return end($documentResources);
    }
}
