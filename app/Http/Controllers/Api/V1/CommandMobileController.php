<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\CommandMobileIncurredCustomerCollect;
use App\Enums\CommandMobileIncurredFrom;
use App\Enums\CommandMobileIncurredStatus;
use App\Enums\CommandMobileStatus;
use App\Enums\InvoiceStatus;
use App\Enums\MediaCollection;
use App\Http\Controllers\Controller;
use App\Http\Resources\CommandMobileIncurredResource;
use App\Http\Resources\CommandMobileResource;
use App\Models\CommandMobile;
use App\Models\Customer;
use App\Models\Fees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommandMobileController extends Controller
{
    protected function formatErrors($validator)
    {
        $messages = $validator->errors()->messages();
        $errors = [];
        foreach ($messages as $key => $value) {
            $key = explode('.', $key);
            $value1 = explode('|', $value[0]);
            $index = $key[1];
            $mes = '';
            switch ($value1[1]) {
                case 'required':
                    $mes = "Vui lòng nhập $value1[0]";
                    break;
            }
            $errors[$key[2]][$index] = $mes;
        }
        return $errors;
    }

    public function index(Request $request)
    {
        try {

            $limit = $request->input('limit', 100);
            $data = CommandMobile::index($request)->paginate($limit);

            return $this->responseApiSuccess(CommandMobileResource::collection($data)->response()->getData());
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function update($id, Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'romooc_id' => 'nullable',
                'driver_id' => 'nullable',
                'route_id' => 'nullable',
                'vehicle_id' => 'nullable',
                'status' => 'nullable',
                'price' => 'nullable',
            ], []);
            if ($validator->fails())
                return $this->responseApiError($validator->errors()->first(), $validator->errors());

            $command = CommandMobile::find($id);

            if (!$command) return $this->responseApiError(__('Model not found'));

            $command->update([
                'romooc_id' => $request->romooc_id ?: $command->romooc_id,
                'driver_id' => $request->driver_id ?: $command->driver_id,
                'route_id' => $request->route_id ?: $command->route_id,
                'vehicle_id' => $request->vehicle_id ?: $command->vehicle_id,
                'status' => $request->status ?: $command->status,
                'price' => $request->price ?: $command->price,
                'advance_money' => $request->advance_money ?: $command->advance_money,
                'bonus_driver_money' => $request->bonus_driver_money ?: $command->bonus_driver_money,
            ]);

            // reUpdatePrice for invoice
            $command->invoice->reUpdatePrice();

            if (isset($request->invoice['time_transport'])) $command->invoice()->update([
                'time_transport' => $request->invoice['time_transport'],
                'time_down_the_line' => $request->invoice['time_down_the_line'],
            ]);

            if (isset($request->invoice['task_transports'])) $command->invoice->taskTransports()->update([
                'get_null_point' => $request->invoice['task_transports']['get_null_point'],
                'get_null_point_request' => $request->invoice['task_transports']['get_null_point_request'],
                'shipping_point' => $request->invoice['task_transports']['shipping_point'],
                'shipping_point_request' => $request->invoice['task_transports']['shipping_point_request'],
                'return_null_point' => $request->invoice['task_transports']['return_null_point'],
                'return_null_point_request' => $request->invoice['task_transports']['return_null_point_request'],
                'note' => $request->invoice['task_transports']['note'],
            ]);

            $command->taskTransports = $command->invoice->taskTransports;

            return $this->responseApiSuccess(new CommandMobileResource($command));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function master()
    {
        try {
            $data['customers'] = Customer::all();
            $data['fees'] = Fees::all();
            $data['command_mobile_status'] = [
                [
                    'id' => CommandMobileStatus::GET_CONT_GOOD->value,
                    'value' => __('Lấy cont hàng'),
                ],
                [
                    'id' => CommandMobileStatus::CUT_MOOC_DOWN_GOOD->value,
                    'value' => __('Cắt mooc/Xuống hàng'),
                ],
                [
                    'id' => CommandMobileStatus::GET_CONT_EMPTY->value,
                    'value' => __('Lấy cont rỗng đi hạ'),
                ],
                [
                    'id' => CommandMobileStatus::DOWN_PACKING->value,
                    'value' => __('Hạ bãi'),
                ],
                [
                    'id' => CommandMobileStatus::CANCEL->value,
                    'value' => __('Đã hủy'),
                ],
            ];

            $data['command_mobile_incurred_from'] = [
                [
                    'id' => CommandMobileIncurredFrom::DRIVER->value,
                    'value' => __('Tài xế chi (từ quỹ tạm ứng)'),
                ],
                [
                    'id' => CommandMobileIncurredFrom::HR->value,
                    'value' => __('Nhân sự chi (từ quỹ tạm ứng)'),
                ],
                [
                    'id' => CommandMobileIncurredFrom::COMPANY->value,
                    'value' => __('Công ty chi (phí công ty thanh toán)'),
                ],
            ];

            $data['command_mobile_incurred_customer_collect'] = [
                [
                    'id' => CommandMobileIncurredCustomerCollect::NOT_COLLECT->value,
                    'value' => __('Không thu'),
                ],
                [
                    'id' => CommandMobileIncurredCustomerCollect::SAVE_DEBT->value,
                    'value' => __('Lưu công nợ'),
                ],
                [
                    'id' => CommandMobileIncurredCustomerCollect::COLLECT_SEPARATE->value,
                    'value' => __('Thu riêng'),
                ],
            ];

            return $this->responseApiSuccess($data);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function updateGetContGood($id, Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'driver_id' => 'required',
            ], []);
            if ($validator->fails())
                return $this->responseApiError($validator->errors()->first(), $validator->errors());

            $command = CommandMobile::find($id);

            if (!$command) return $this->responseApiError(__('Model not found'));

            if (!in_array($command->status, [CommandMobileStatus::NEW->value]))
                return $this->responseApiError(__('Cannot update'));

            foreach ($command->conts as $key => $cont) {
                if (is_array($request->conts) && count($request->conts) >= $key + 1) {
                    $cont->update([
                        'code' => $request->conts[$key]['code'] ?? '',
                        'seal' => $request->conts[$key]['seal'] ?? '',
                        'gross' => $request->conts[$key]['gross'] ?? '',
                    ]);
                }
            }

            $command->update([
                'status' => CommandMobileStatus::GET_CONT_GOOD->value,
                'driver_id' => $request->driver_id
            ]);

            $command->invoice->update([
                'status' => InvoiceStatus::COMMAND_RUNNING->value,
            ]);

            $commandStatus = $command->statuses()->updateOrCreate(
                [
                    'status' => CommandMobileStatus::GET_CONT_GOOD->value
                ],
                [
                    'user_id' => $user->id,
                    'properties' => json_encode(['time' => $request->time ?? null]),
                ]
            );

            if ($request->file('images') && count($request->file('images'))) {
                foreach ($request->file('images') as $key => $value) {
                    $commandStatus->addMedia($value)->toMediaCollection(MediaCollection::COMMAND_MOBILE_IMAGES->value);
                }
            }

            return $this->responseApiSuccess(new CommandMobileResource($command));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function updateCutMoocDownGood($id, Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                //'driver_id' => 'required',
            ], []);
            if ($validator->fails())
                return $this->responseApiError($validator->errors()->first(), $validator->errors());

            $command = CommandMobile::find($id);

            if (!$command)
                return $this->responseApiError(__('Model not found'));

            if (!in_array($command->status, [CommandMobileStatus::GET_CONT_GOOD->value]))
                return $this->responseApiError(__('Cannot update'));

            $command->update([
                'status' => CommandMobileStatus::CUT_MOOC_DOWN_GOOD->value,
            ]);

            $commandStatus = $command->statuses()->updateOrCreate(
                [
                    'status' => CommandMobileStatus::CUT_MOOC_DOWN_GOOD->value
                ],
                [
                    'user_id' => $user->id,
                    'properties' => json_encode(['time' => $request->time ?? null]),
                ]
            );

            if ($request->file('images') && count($request->file('images'))) {
                foreach ($request->file('images') as $key => $value) {
                    $commandStatus->addMedia($value)->toMediaCollection(MediaCollection::COMMAND_MOBILE_IMAGES->value);
                }
            }

            return $this->responseApiSuccess(new CommandMobileResource($command));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function updateGetContEmpty($id, Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                //'driver_id' => 'required',
            ], []);
            if ($validator->fails())
                return $this->responseApiError($validator->errors()->first(), $validator->errors());

            $command = CommandMobile::find($id);

            if (!$command) return $this->responseApiError(__('Model not found'));

            if (!in_array($command->status, [CommandMobileStatus::CUT_MOOC_DOWN_GOOD->value]))
                return $this->responseApiError(__('Cannot update'));

            $command->update([
                'status' => CommandMobileStatus::GET_CONT_EMPTY->value,
            ]);

            $commandStatus = $command->statuses()->updateOrCreate(
                [
                    'status' => CommandMobileStatus::GET_CONT_EMPTY->value
                ],
                [
                    'user_id' => $user->id,
                    'properties' => json_encode(['time' => $request->time ?? null]),
                ]
            );

            if ($request->file('images') && count($request->file('images'))) {
                foreach ($request->file('images') as $key => $value) {
                    $commandStatus->addMedia($value)->toMediaCollection(MediaCollection::COMMAND_MOBILE_IMAGES->value);
                }
            }

            return $this->responseApiSuccess(new CommandMobileResource($command));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function updateDownPacking($id, Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                //'driver_id' => 'required',
            ], []);
            if ($validator->fails())
                return $this->responseApiError($validator->errors()->first(), $validator->errors());

            $command = CommandMobile::find($id);

            if (!$command) return $this->responseApiError(__('Model not found'));

            if (!in_array($command->status, [CommandMobileStatus::GET_CONT_EMPTY->value]))
                return $this->responseApiError(__('Cannot update'));

            $command->update([
                'status' => CommandMobileStatus::DOWN_PACKING->value,
            ]);

            $commandStatus = $command->statuses()->updateOrCreate(
                [
                    'status' => CommandMobileStatus::DOWN_PACKING->value
                ],
                [
                    'user_id' => $user->id,
                    'properties' => json_encode(['time' => $request->time ?? null]),
                ]
            );

            if ($request->file('images') && count($request->file('images'))) {
                foreach ($request->file('images') as $key => $value) {
                    $commandStatus->addMedia($value)->toMediaCollection(MediaCollection::COMMAND_MOBILE_IMAGES->value);
                }
            }

            return $this->responseApiSuccess(new CommandMobileResource($command));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function updateCompleted($id, Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                //'driver_id' => 'required',
            ], []);
            if ($validator->fails())
                return $this->responseApiError($validator->errors()->first(), $validator->errors());

            $command = CommandMobile::find($id);

            if (!$command) return $this->responseApiError(__('Model not found'));

            if (!in_array($command->status, [CommandMobileStatus::DOWN_PACKING->value]))
                return $this->responseApiError(__('Cannot update'));

            $command->update([
                'status' => CommandMobileStatus::COMPLETED->value,
            ]);

            $commandStatus = $command->statuses()->updateOrCreate(
                [
                    'status' => CommandMobileStatus::COMPLETED->value
                ],
                [
                    'user_id' => $user->id,
                    'properties' => json_encode(['time' => $request->time ?? null]),
                ]
            );

            if ($request->file('images') && count($request->file('images'))) {
                foreach ($request->file('images') as $key => $value) {
                    $commandStatus->addMedia($value)->toMediaCollection(MediaCollection::COMMAND_MOBILE_IMAGES->value);
                }
            }

            return $this->responseApiSuccess(new CommandMobileResource($command));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $command = CommandMobile::find($id);
            $command->taskTransports = $command->invoice->taskTransports;

            return $this->responseApiSuccess(new CommandMobileResource($command));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function storeIncurred($id, Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'incurreds' => 'required|array',
                'incurreds.*.money' => 'required',
                'incurreds.*.fee_id' => 'required',
                'incurreds.*.invoice_date' => 'required',
            ], [
                'incurreds.*.money.required' => ':attribute|required',
                'incurreds.*.fee_id.required' => ':attribute|required',
                'incurreds.*.invoice_date.required' => ':attribute|required',
            ], [
                'incurreds.*.money' => 'Số tiền thanh toán',
                'incurreds.*.fee_id' => 'Tên loại phí',
                'incurreds.*.invoice_date' => 'Ngày hóa đơn',
            ]);
            // return $this->formatErrors($validator);
            // $validator->errors()->messages() = $this->formatErrors($validator);
            if ($validator->fails())
                return $this->responseApiError($this->formatErrors($validator), $validator->errors(), 422);

            $command = CommandMobile::find($id);

            if (!$command) return $this->responseApiError(__('Model not found'));

            if ($request->bonus_driver_money) {
                $command->update([
                    'bonus_driver_money' => $request->bonus_driver_money
                ]);
            }

            if (in_array($command->status, [CommandMobileStatus::COMPLETED->value]))
                return $this->responseApiError(__('Cannot update'));

            foreach ($request->incurreds as $key => $value) {
                $data = [
                    'money' => $value['money'] ?? 0,
                    'customer_money' => $value['customer_money'] ?? 0,
                    'fee_id' => $value['fee_id'] ?? 0,
                    'note' => $value['note'] ?? null,
                    'invoice_date' => $value['invoice_date'] ?? null,
                    'invoice_code' => $value['invoice_code'] ?? null,
                    'incurred_from' => $value['incurred_from'] ?? CommandMobileIncurredFrom::DRIVER->value,
                    'customer_collect' => $value['customer_collect'] ?? CommandMobileIncurredCustomerCollect::NOT_COLLECT->value,
                    'is_no_need_confirm' => $value['is_no_need_confirm'] ? 1 : 0,
                    'status' => $value['status'] ?? CommandMobileIncurredStatus::NEW->value,
                ];

                if ($data['is_no_need_confirm']) {
                    $data['status'] == CommandMobileIncurredStatus::CONFIRMED->value;
                    $data['confirm_at'] = now();
                    $data['confirm_by_user_id'] = $user->id;
                }

                $incurred = $command->incurreds()->updateOrCreate([
                    'id' => $value['id'] ?? 0,
                ], $data);

                if (isset($value['images']) && is_array($value['images']) && !$value['id']) {
                    foreach ($value['images'] as $keyI => $valueI) {
                        // có thể cần re base64
                        $incurred->addMedia($valueI)->toMediaCollection(MediaCollection::COMMAND_MOBILE_INCURRED_IMAGES->value);
                    }
                }
            }

            return $this->responseApiSuccess(CommandMobileIncurredResource::collection($command->incurreds));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function confirmIncurred($id, $incurredId, Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'status' => 'in:' . CommandMobileIncurredStatus::implodes()
            ], []);
            if ($validator->fails())
                return $this->responseApiError($validator->errors()->first(), $validator->errors());

            $command = CommandMobile::find($id);

            if (!$command) return $this->responseApiError(__('Model not found'));

            if (in_array($command->status, [CommandMobileStatus::COMPLETED->value]))
                return $this->responseApiError(__('Cannot update'));

            $incurred = $command->incurreds()->find($incurredId);
            if (!$incurred) return $this->responseApiError(__('Model not found'));

            if (!in_array($incurred->status, [CommandMobileIncurredStatus::NEW->value]))
                return $this->responseApiError(__('Cannot update'));

            $incurred->update([
                'status' => $request->status,
                'confirm_at' => now(),
                'confirm_by_user_id' => $user->id,
            ]);

            return $this->responseApiSuccess(new CommandMobileIncurredResource($incurred));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function deleteIncurred($id, $incurredId, Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'status' => 'in:' . CommandMobileIncurredStatus::implodes()
            ], []);
            if ($validator->fails())
                return $this->responseApiError($validator->errors()->first(), $validator->errors());

            $command = CommandMobile::find($id);

            if (!$command) return $this->responseApiError(__('Model not found'));

            if (in_array($command->status, [CommandMobileStatus::COMPLETED->value]))
                return $this->responseApiError(__('Cannot update'));

            $incurred = $command->incurreds()->find($incurredId);
            if (!$incurred) return $this->responseApiError(__('Model not found'));

            if (!in_array($incurred->status, [CommandMobileIncurredStatus::NEW->value]))
                return $this->responseApiError(__('Cannot update'));

            $incurred->delete();

            return $this->responseApiSuccess();
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }
}
