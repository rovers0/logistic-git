<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Enums\MediaCollection;
use App\Enums\DocumentType;
use App\Http\Controllers\Controller;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use App\Models\Driver;
use App\Models\User;
use App\Models\VehicleDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\SimpleExcel\SimpleExcelReader;

class VehicleController extends Controller
{
    protected $vehiclesValidates = [
        'plate.required' => 'Biển số xe là trường bắt buộc.',
        'plate.unique' => 'Biển số xe đã tồn tại.',
        'axle.required' => 'Số cầu là trường bắt buộc.',
        'axle.integer' => 'Số cầu không hợp lệ.',
        'type.required' => 'Cổ đông xe là trường bắt buộc.',
        'type.integer' => 'Cổ đông xe không hợp lệ.',
        'images.array' => 'Hình ảnh không hợp lệ.',
        'images.*.file' => 'Hình ảnh không hợp lệ.',
        'addable_files.array' => 'File đính kèm không hợp lệ.',
        'addable_files.*.file' => 'File đính kèm không hợp lệ.',
    ];

    public function index(Request $request)
    {
        try {

            $limit = $request->input('limit', 100);
            $data = Vehicle::index($request)->paginate($limit);

            return $this->responseApiSuccess(VehicleResource::collection($data)->response()->getData());
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function master()
    {
        try {
            $data['plate'] = Vehicle::pluck('plate'); // nêu cần thì viết thêm scope cho master
            $data['driver'] = User::where('role', UserRole::DRIVER)->get();
            return $this->responseApiSuccess($data);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'plate' => 'required|unique:vehicles',
                'axle' => 'required|integer',
                'type' => 'required|integer',
                'images' => 'nullable|array',
                'images.*' => 'file',
                'addable_files' => 'nullable|array',
                'addable_files.*' => 'file',
            ], $this->vehiclesValidates);
            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors(), 422);

            $vehicle = Vehicle::create([
                'plate' => $request->plate ?? null,
                'axle' => $request->axle ?? null,
                'type' => $request->type ?? null,
                'parking_lot' => $request->parkingLot ?? null,
                'chassis' => $request->chassis ?? null,
                'seri' => $request->seri ?? null,
                'note' => $request->note ?? null,
            ]);

            if ($request->driver && $vehicle instanceof Vehicle) {
                $vehicle->drivers()->sync($request->driver);
            }

            if ($request->file('images') && count($request->file('images'))) {
                foreach ($request->file('images') as $key => $value) {
                    $vehicle->addMedia($value)->toMediaCollection(MediaCollection::IMAGE->value);
                }
            }
            if ($request->file('addable_files') && count($request->file('addable_files'))) {
                foreach ($request->file('addable_files') as $key => $value) {
                    $vehicle->addMedia($value)->toMediaCollection(MediaCollection::DOCUMENT->value);
                }
            }

            return $this->responseApiSuccess(new VehicleResource($vehicle));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        try {
            $validator = Validator::make($request->all(), [
                'plate' => 'required|unique:vehicles,plate,'.$vehicle->id,
                'axle' => 'required|integer',
                'type' => 'required|integer',
                'images' => 'nullable|array',
                'images.*' => 'file',
                'addable_files' => 'nullable|array',
                'addable_files.*' => 'file',
            ], $this->vehiclesValidates);
            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors(), 422);

            $vehicle->update([
                'plate' => $request->plate ?? null,
                'axle' => $request->axle ?? null,
                'type' => $request->type ?? null,
                'parking_lot' => $request->parking_lot ?? null,
                'chassis' => $request->chassis ?? null,
                'seri' => $request->seri ?? null,
                'note' => $request->note ?? null,
            ]);

            if ($request->driver && $vehicle instanceof Vehicle) {
                $vehicle->drivers()->sync($request->driver);
            }

            //add media here use media library
            if ($request->file('images') && count($request->file('images'))) {
                foreach ($request->file('images') as $key => $value) {
                    $vehicle->addMedia($value)->toMediaCollection(MediaCollection::IMAGE->value);
                }
            }
            if ($request->file('addable_files') && count($request->file('addable_files'))) {
                foreach ($request->file('addable_files') as $key => $value) {
                    $vehicle->addMedia($value)->toMediaCollection(MediaCollection::DOCUMENT->value);
                }
            }

            return $this->responseApiSuccess(new VehicleResource($vehicle));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function destroy(Request $request, Vehicle $vehicle)
    {
        try {
            $vehicle->delete();

            return $this->responseApiSuccess();
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function document(Request $request, Vehicle $vehicle)
    {
        $messagesValidate = [
            'document_type.required' => 'Loại tài liệu là trường bắt buộc.',
            'document_type.string' => 'Loại tài liệu phải là chuỗi ký tự.',
            'document_type.in' => 'Loại tài liệu đang không chính xác',
            'effective_date.required' => 'Ngày hiệu lực là trường bắt buộc.',
            'expiration_date.required' => 'Ngày hết hạn là trường bắt buộc.',
            'notice_duration.numeric' => 'Thời gian thông báo phải là một số.',
            'notice_duration.regex' => 'Thời gian thông báo phải là một số.',
            'fees.required' => 'Phí là trường bắt buộc.',
            'fees.numeric' => 'Phí phải là một số.',
        ];

        try {
            $validator = Validator::make($request->all(), [
                'document_type' => 'required|string|in:vehicleInspection,roadMaintenance,voluntaryInsurance,mandatoryInsurance,roadPermit',
                'registration_date' => 'nullable',
                'effective_date' => 'required',
                'expiration_date' => 'required',
                'notice_duration' => 'nullable|numeric|regex:/^\d+$/',
                'fees' => 'required|numeric',
                'images' => 'nullable|array',
                'images.*' => 'file',
                'addable_files' => 'nullable|array',
                'addable_files.*' => 'file',
            ], $messagesValidate);

            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors(), 422);

            $documentType = DocumentType::fromName(strtoupper($request->document_type));
            $documentData = [
                'document_type' => $documentType,
                'effective_date' => $request->effective_date ?? null,
                'expiration_date' => $request->expiration_date ?? null,
                'notice_duration' => $request->notice_duration ?? null,
                'fees' => $request->fees ?? null,
                'note' => $request->note ?? null,
            ];

            if ($request->id && $request->id > 0) {
                $document = VehicleDocument::findOrFail($request->id);
                $document->update($documentData);
            } else {
                $document = new VehicleDocument($documentData);
                $vehicle->documents()->save($document);
            }

            // Store the uploaded image
            if ($request->file('images') && count($request->file('images'))) {
                foreach ($request->file('images') as $key => $value) {
                    $document->addMedia($value)->toMediaCollection(MediaCollection::IMAGE->value);
                }
            }
            if ($request->file('addable_files') && count($request->file('addable_files'))) {
                foreach ($request->file('addable_files') as $key => $value) {
                    $document->addMedia($value)->toMediaCollection(MediaCollection::DOCUMENT->value);
                }
            }
            return $this->responseApiSuccess($document);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function destroyMedia(Request $request, Vehicle $vehicle, $id)
    {
        try {
            $media = $vehicle->getMedia("*")->where('uuid', $id)->first();

            if (!$media) {
                return $this->responseApiError(__('media not found.'));
            }

            $media->delete();

            return $this->responseApiSuccess($media);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function destroyDocumentMedia(Request $request, VehicleDocument $vehicle, $id)
    {
        try {
            $media = $vehicle->getMedia("*")->where('uuid', $id)->first();

            if (!$media) {
                return $this->responseApiError(__('media not found.'));
            }

            $media->delete();

            return $this->responseApiSuccess($media);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }
}
