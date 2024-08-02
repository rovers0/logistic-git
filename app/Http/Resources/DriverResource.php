<?php

namespace App\Http\Resources;

use App\Enums\MediaCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DriverResource extends JsonResource
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
            'birthday' => $this->birthday,
            'bith_place' => $this->bith_place,
            'passport' => $this->passport,
            'relative_phone' => $this->relative_phone,
            'relative_name' => $this->relative_name,
            'salary' => $this->salary,
            'allowance' => $this->allowance,
            'insurance' => $this->insurance,
            'commission_percent' => $this->commission_percent,
            'experient_year' => $this->experient_year,
            'license_class' => $this->license_class,
            'license' => $this->license,
            'license_expired_date' => $this->license_expired_date,
            'save_date' => $this->save_date,
            'receive_user_id' => $this->receive_user_id,
            'receive_date' => $this->receive_date,
            'release_date' => $this->release_date,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,

            'vehicle' => $this->vehicles,
            'user' => $this->user,

            'cv_root_file' => $this->getMedia(MediaCollection::CV_ROOT->value),
            'addable_files' => $this->getMedia(MediaCollection::DOCUMENT->value),
        ];
    }
}
