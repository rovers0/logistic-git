<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Enums\MediaCollection;
use App\Http\Controllers\Controller;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\SimpleExcel\SimpleExcelReader;

class VehicleController extends Controller
{
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
            ]);
            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors());

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
            ]);
            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors());

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
                $vehicle->clearMediaCollection(MediaCollection::IMAGE->value);
                foreach ($request->file('images') as $key => $value) {
                    $vehicle->addMedia($value)->toMediaCollection(MediaCollection::IMAGE->value);
                }
            }
            if ($request->file('addable_files') && count($request->file('addable_files'))) {
                $vehicle->clearMediaCollection(MediaCollection::DOCUMENT->value);
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
}
