<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\DriverStatus;
use App\Enums\ImportType;
use App\Enums\MediaCollection;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Resources\DriverResource;
use App\Models\Driver;
use App\Models\Import;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Spatie\SimpleExcel\SimpleExcelReader;

class DriverController extends Controller
{
    protected $driversValidates = [
        'name.required' => 'Vui lòng nhập tên.',
        'vehicles.required' => 'Vui lòng chọn xe.',
        'vehicles.array' => 'Xe không hợp lệ.',
        'phone.required' => 'Vui lòng nhập số điện thoại.',
        'phone.unique' => 'Số điện thoại đã tồn tại.',
        'birthday.required' => 'Vui lòng nhập ngày sinh.',
        'passport.required' => 'Vui lòng nhập số CMND/CCCD/Passport.',
        'relative_phone.required' => 'Vui lòng nhập số điện thoại của người thân.',
        'relative_name.required' => 'Vui lòng nhập tên người thân.',
        'salary.required' => 'Vui lòng nhập mức lương.',
        'license_class.required' => 'Vui lòng nhập loại bằng lái.',
        'license.required' => 'Vui lòng nhập số bằng lái.',
        'license_expired_date.required' => 'Vui lòng nhập ngày hết hạn bằng lái.',
        'start_date.required' => 'Vui lòng nhập ngày bắt đầu làm việc.',
        'cv_root_file.required' => 'Vui lòng chọn File hồ sơ gốc + Biên bản giao xe.',
        'cv_root_file.*.file' => 'File hồ sơ gốc + Biên bản giao xe không hợp lệ.',
        'email.email' => 'Địa chỉ email không hợp lệ.',
        'addable_files.*.file' => 'File đính kèm không hợp lệ.',
    ];

    public function index(Request $request)
    {
        try {

            $limit = $request->input('limit', 100);
            $data = Driver::index($request)->paginate($limit);

            return $this->responseApiSuccess(DriverResource::collection($data)->response()->getData());
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function master()
    {
        try {
            $data['vehicle'] = Vehicle::get(); // nêu cần thì viết thêm scope cho master
            $data['receive_user'] = User::where('role', '<>', UserRole::DRIVER)->get();
            return $this->responseApiSuccess($data);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'vehicles' => 'required|array',
                'phone' => 'required|unique:users,phone',
                'birthday' => 'required',
                'passport' => 'required',
                'relative_phone' => 'required',
                'relative_name' => 'required',
                'salary' => 'required',
                'license_class' => 'required',
                'license' => 'required',
                'license_expired_date' => 'required',
                'start_date' => 'required',
                'cv_root_file' => 'required|array',
                'cv_root_file.*' => 'file',
                'email' => 'nullable|email',
                'bith_place' => 'nullable',
                'allowance' => 'nullable',
                'insurance' => 'nullable',
                'commission_percent' => 'nullable',
                'experient_year' => 'nullable',
                'save_date' => 'nullable',
                'receive_user_id' => 'nullable',
                'receive_date' => 'nullable',
                'release_date' => 'nullable',
                'end_date' => 'nullable',
                'status' => 'nullable',
                'addable_files' => 'nullable|array',
                'addable_files.*' => 'file',
            ], $this->driversValidates);
            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors(), 422);

            // make user for driver
            $checkUser = User::where('account', $request->phone)->first();
            if ($checkUser) return $this->responseApiError(__('User phone account existed'), ['phone' => ['Số điện thoại đã tồn tại.']], 422);

            $user = User::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'account' => $request->phone,
                'role' => UserRole::DRIVER->value,
                'password' => Hash::make($request->password ?: $request->phone),
            ]);

            $driver = $user->driver()->create([
                'relative_name' => $request->relative_name,
                'relative_phone' => $request->relative_phone,
                'birthday' => $request->birthday,
                'bith_place' => $request->bith_place,
                'passport' => $request->passport,
                'salary' => $request->salary,
                'allowance' => $request->allowance,
                'insurance' => $request->insurance,
                'commission_percent' => $request->commission_percent,
                'experient_year' => $request->experient_year,
                'license_class' => $request->license_class,
                'license' => $request->license,
                'license_expired_date' => $request->license_expired_date,
                'save_date' => $request->save_date,
                'receive_user_id' => $request->receive_user_id,
                'receive_date' => $request->receive_date,
                'release_date' => $request->release_date,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'status' => DriverStatus::ACTIVE->value,
            ]);

            $driver->vehicles()->sync($request->vehicles);
            //add media here use media library
            //if ($request->file('cv_root_file')) $driver->addMedia($request->file('cv_root_file')[0])->toMediaCollection(MediaCollection::CV_ROOT->value);

            if ($request->file('cv_root_file') && count($request->file('cv_root_file'))) foreach ($request->file('cv_root_file') as $key => $value) {
                $driver->addMedia($value)->toMediaCollection(MediaCollection::CV_ROOT->value);
            }
            if ($request->file('addable_files') && count($request->file('addable_files'))) foreach ($request->file('addable_files') as $key => $value) {
                $driver->addMedia($value)->toMediaCollection(MediaCollection::DOCUMENT->value);
            }

            return $this->responseApiSuccess(new DriverResource($driver));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function update(Request $request, Driver $driver)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'vehicles' => 'required|array',
                'phone' => 'required',
                'birthday' => 'required',
                'passport' => 'required',
                'relative_phone' => 'required',
                'relative_name' => 'required',
                'salary' => 'required',
                'license_class' => 'required',
                'license' => 'required',
                'license_expired_date' => 'required',
                'start_date' => 'required',
                'email' => 'nullable|email',
                'bith_place' => 'nullable',
                'allowance' => 'nullable',
                'insurance' => 'nullable',
                'commission_percent' => 'nullable',
                'experient_year' => 'nullable',
                'save_date' => 'nullable',
                'receive_user_id' => 'nullable',
                'receive_date' => 'nullable',
                'release_date' => 'nullable',
                'end_date' => 'nullable',
                'status' => 'nullable',
                'addable_files' => 'nullable|array',
                'addable_files.*' => 'file',
            ], $this->driversValidates);
            if ($validator->fails())
                return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $validator->errors(), 422);

            $driver->user()->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'account' => $request->phone,
                'role' => UserRole::DRIVER->value,
                'password' => Hash::make($request->password ?: $request->phone),
            ]);

            $driver->update([
                'relative_name' => $request->relative_name,
                'relative_phone' => $request->relative_phone,
                'birthday' => $request->birthday,
                'bith_place' => $request->bith_place,
                'passport' => $request->passport,
                'salary' => $request->salary,
                'allowance' => $request->allowance,
                'insurance' => $request->insurance,
                'commission_percent' => $request->commission_percent,
                'experient_year' => $request->experient_year,
                'license_class' => $request->license_class,
                'license' => $request->license,
                'license_expired_date' => $request->license_expired_date,
                'save_date' => $request->save_date,
                'receive_user_id' => $request->receive_user_id,
                'receive_date' => $request->receive_date,
                'release_date' => $request->release_date,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'status' => $request->status,
            ]);

            $driver->vehicles()->sync($request->vehicles);

            if ($request->file('cv_root_file') && count($request->file('cv_root_file'))) {
                foreach ($request->file('cv_root_file') as $key => $value) {
                    $driver->addMedia($value)->toMediaCollection(MediaCollection::CV_ROOT->value);
                }
            }
            if ($request->file('addable_files') && count($request->file('addable_files'))) {
                foreach ($request->file('addable_files') as $key => $value) {
                    $driver->addMedia($value)->toMediaCollection(MediaCollection::DOCUMENT->value);
                }
            }

            return $this->responseApiSuccess(new DriverResource($driver));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function destroy(Request $request, Driver $driver)
    {
        try {
            $driver->delete();

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
                'type' => ImportType::DRIVER->value,
            ]);

            $file = $import->addMedia($request->file('import_file'))->toMediaCollection(MediaCollection::IMPORT->value);

            $rows = SimpleExcelReader::create($file->original_url)->getRows();
            foreach ($rows as $key => $row) {
                if (User::where('account', $row['phone'])) continue;
                $user = User::create([
                    'name' => $row['name'],
                    'phone' => $row['phone'],
                    'account' => $row['phone'],
                    'role' => UserRole::DRIVER->value,
                    'password' => Hash::make($row['password']),
                ]);

                $driver = $user->driver()->create([
                    'relative_name' => $row['relative_name'],
                    'relative_phone' => $row['relative_phone'],
                    'birthday' => $row['birthday'],
                    'bith_place' => $row['bith_place'],
                    'passport' => $row['passport'],
                    'salary' => $row['salary'],
                    'allowance' => $row['allowance'],
                    'insurance' => $row['insurance'],
                    'commission_percent' => $row['commission_percent'],
                    'experient_year' => $row['experient_year'],
                    'license_class' => $row['license_class'],
                    'license' => $row['license'],
                    'license_expired_date' => $row['license_expired_date'] ?? null,
                    'save_date' => $row['save_date'] ?? null,
                    'receive_user_id' => $user->id,
                    'receive_date' => $row['receive_date'] ?? null,
                    'release_date' => $row['release_date'] ?? null,
                    'start_date' => $row['start_date'] ?? null,
                    'end_date' => $row['end_date'] ?? null,
                    'status' => DriverStatus::ACTIVE->value,
                ]);
            };

            return $this->responseApiSuccess($file);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function getDriverAll(Request $request)
    {
        try {

            $data = Driver::index($request)->get();

            return $this->responseApiSuccess(DriverResource::collection($data)->response()->getData());
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function destroyMedia(Request $request, Driver $driver, $id)
    {
        try {
            $media = $driver->getMedia("*")->where('uuid', $id)->first();

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
