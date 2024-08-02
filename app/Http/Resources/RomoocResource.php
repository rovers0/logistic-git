<?php

namespace App\Http\Resources;

use App\Enums\MediaCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RomoocResource extends JsonResource
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
            'serial' => $this->serial,
            'frame_number' => $this->frame_number,
            'weight' => $this->weight,
            'size' => $this->size,
            'type' => $this->type,
            'axis' => $this->axis,
            'note' => $this->note,
            'packing_id' => $this->packing_id,
            // 'vehicle' => $this->vehicle,
            'parking' => $this->packing,
            'inspection' => $this->attachmentDocument($this->vehicleInspection),
            'roadMaintenance' => $this->attachmentDocument($this->vehicleRoadMaintenance),
            'voluntaryInsurance' => $this->attachmentDocument($this->vehicleVoluntaryInsurance),
            'mandatoryInsurance' => $this->attachmentDocument($this->vehicleMandatoryInsurance),
            'roadPermit' => $this->attachmentDocument($this->vehicleRoadPermit),
            'images' => $this->getMedia(MediaCollection::IMAGE->value),
            'addable_files' => $this->getMedia(MediaCollection::DOCUMENT->value),
        ];
    }

    function attachmentDocument($collection) {
        $documentResources = [];
        foreach ($collection as $item) {
            $documentResources[] = new VehicleDocumentResource($item);
        }

        return end($documentResources);
    }
}
