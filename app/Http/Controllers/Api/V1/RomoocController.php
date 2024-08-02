<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\DriverStatus;
use App\Enums\ImportType;
use App\Enums\MediaCollection;
use App\Enums\RomoocAxis;
use App\Enums\RomoocSize;
use App\Enums\RomoocType;
use App\Enums\UserRole;
use App\Enums\DocumentType;
use App\Http\Controllers\Controller;
use App\Http\Resources\DriverResource;
use App\Http\Resources\RomoocResource;
use App\Models\Driver;
use App\Models\Import;
use App\Models\Packing;
use App\Models\Romooc;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Spatie\SimpleExcel\SimpleExcelReader;

class RomoocController extends Controller
{
    protected $msgMoocValidates = [
        'serial.required' => 'Số sơ mi rơ mooc là trường bắt buộc.',
        'serial.unique' => 'Số sơ mi rơ mooc  đã tồn tại.',
        'weight.required' => 'Tải trọng  là trường bắt buộc.',
        'size.required' => 'Kích cỡ là trường bắt buộc.',
        'type.required' => 'Loại mooc là trường bắt buộc.',
        'axis.required' => 'Số trục là trường bắt buộc.',
        'images.array' => 'Hình ảnh không hợp lệ.',
        'images.*.file' => 'Hình ảnh không hợp lệ.',
        'addable_files.array' => 'File đính kèm không hợp lệ.',
        'addable_files.*.file' => 'File đính kèm không hợp lệ.',
    ];

    public function index(Request $request)
    {
        try {

            $limit = $request->input('limit', 100);
            $data = Romooc::index($request)->paginate($limit);

            return $this->responseApiSuccess(RomoocResource::collection($data)->response()->getData());
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function getAll(Request $request)
    {
        try {

            $data = Romooc::pluck('serial');

            return $this->responseApiSuccess($data);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function master()
    {
        try {
            $data['parking'] = Packing::get(); // nêu cần thì viết thêm scope cho master

            $data['size'] = [
                [
                    'id' => RomoocSize::SIZE_20->value,
                    'value' => __('Mooc 20'),
                ],
                [
                    'id' => RomoocSize::SIZE_40->value,
                    'value' => __('Mooc 40'),
                ],
            ];

            $data['type'] = [
                [
                    'id' => RomoocType::MOC_SAN->value,
                    'value' => __('Mooc Sàn'),
                ],
                [
                    'id' => RomoocType::MOC_SUONG->value,
                    'value' => __('Mooc Sương'),
                ],
            ];

            $data['axis'] = [
                [
                    'id' => RomoocAxis::AXIS_2->value,
                    'value' => __('2 Trục'),
                ],
                [
                    'id' => RomoocAxis::AXIS_3->value,
                    'value' => __('3 Trục'),
                ],
            ];

            return $this->responseApiSuccess($data);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'weight' => 'required',
                'size' => 'required',
                'type' => 'required',
                'axis' => 'required',
                'images.*' => 'required|file',
                'serial' => 'required|unique:romoocs',
                'frame_number' => 'nullable',
                'packing_id' => 'nullable',
                'note' => 'nullable',
                'addable_files.*' => 'nullable|file',
            ], $this->msgMoocValidates);
            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors(), 422);

            $romooc = Romooc::create([
                'serial' => $request->serial,
                'frame_number' => $request->frame_number,
                'weight' => $request->weight,
                'size' => $request->size,
                'type' => $request->type,
                'axis' => $request->axis,
                'note' => $request->note,
                'packing_id' => $request->packing_id ?: 0,
            ]);

            //add media here use media library
            if ($request->file('images') && count($request->file('images'))) foreach ($request->file('images') as $key => $value) {
                $romooc->addMedia($value)->toMediaCollection(MediaCollection::IMAGE->value);
            }

            if ($request->file('addable_files') && count($request->file('addable_files'))) foreach ($request->file('addable_files') as $key => $value) {
                $romooc->addMedia($value)->toMediaCollection(MediaCollection::DOCUMENT->value);
            }

            return $this->responseApiSuccess(new RomoocResource($romooc));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage(), 422);
        }
    }

    public function update(Request $request, Romooc $romooc)
    {
        try {
            $validator = Validator::make($request->all(), [
                'weight' => 'required',
                'size' => 'required',
                'type' => 'required',
                'axis' => 'required',
                'images' => 'nullable|array',
                'images.*' => 'file',
                'serial' => 'nullable|unique:romoocs,serial,'.$romooc->id,
                'frame_number' => 'nullable',
                'packing_id' => 'nullable',
                'note' => 'nullable',
                'addable_files' => 'nullable|array',
                'addable_files' => 'nullable|file',
            ], $this->msgMoocValidates);
            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors(), 422);

            $romooc->update([
                'serial' => $request->serial,
                'frame_number' => $request->frame_number,
                'weight' => $request->weight,
                'size' => $request->size,
                'type' => $request->type,
                'axis' => $request->axis,
                'note' => $request->note,
                'packing_id' => $request->packing_id ?: 0,
            ]);

            //add media here use media library
            if ($request->file('images') && count($request->file('images'))) {
                foreach ($request->file('images') as $key => $value) {
                    $romooc->addMedia($value)->toMediaCollection(MediaCollection::IMAGE->value);
                }
            }
            if ($request->file('addable_files') && count($request->file('addable_files'))) {
                foreach ($request->file('addable_files') as $key => $value) {
                    $romooc->addMedia($value)->toMediaCollection(MediaCollection::DOCUMENT->value);
                }
            }

            return $this->responseApiSuccess(new RomoocResource($romooc));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function destroy(Request $request, Romooc $remooc)
    {
        try {
            $remooc->delete();

            return $this->responseApiSuccess();
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function import(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'import_file' => 'required|file',
            ]);

            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors());

            $user = $request->user();

            $import = Import::create([
                'user_id' => $user?->id ?: 0,
                'type' => ImportType::ROMOOC->value,
            ]);

            $file = $import->addMedia($request->file('import_file'))->toMediaCollection(MediaCollection::IMPORT->value);

            $rows = SimpleExcelReader::create($file->original_url)->getRows();
            foreach ($rows as $key => $row) {
                $user = User::create([
                    'serial' => $row['serial'],
                    'frame_number' => $row['frame_number'],
                    'weight' => $row['weight'],
                    'size' => $row['size'],
                    'type' => $row['type'],
                    'axis' => $row['axis'],
                    'note' => $row['note'],
                    'packing_id' => $row['packing_id'],
                ]);
            };

            return $this->responseApiSuccess($file);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function document(Request $request, Romooc $romooc)
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
                $romooc->documents()->save($document);
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

    public function destroyMedia(Request $request, Romooc $romooc, $id)
    {
        try {
            $media = $romooc->getMedia("*")->where('uuid', $id)->first();

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
