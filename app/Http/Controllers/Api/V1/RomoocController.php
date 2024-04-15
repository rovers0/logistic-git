<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\DriverStatus;
use App\Enums\ImportType;
use App\Enums\MediaCollection;
use App\Enums\RomoocAxis;
use App\Enums\RomoocSize;
use App\Enums\RomoocType;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Resources\DriverResource;
use App\Http\Resources\RomoocResource;
use App\Models\Driver;
use App\Models\Import;
use App\Models\Packing;
use App\Models\Romooc;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Spatie\SimpleExcel\SimpleExcelReader;

class RomoocController extends Controller
{
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

                'serial' => 'nullable',
                'frame_number' => 'nullable',
                'packing_id' => 'nullable',
                'note' => 'nullable',
                'addable_files.*' => 'nullable|file',
            ]);
            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors());

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
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
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
                'serial' => 'nullable',
                'frame_number' => 'nullable',
                'packing_id' => 'nullable',
                'note' => 'nullable',
                'addable_files' => 'nullable|array',
                'addable_files' => 'nullable|file',
            ]);
            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors());

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
                $romooc->clearMediaCollection(MediaCollection::IMAGE->value);
                foreach ($request->file('images') as $key => $value) {
                    $romooc->addMedia($value)->toMediaCollection(MediaCollection::IMAGE->value);
                }
            }
            if ($request->file('addable_files') && count($request->file('addable_files'))) {
                $romooc->clearMediaCollection(MediaCollection::DOCUMENT->value);
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
}
