<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\FeeTransportType;
use App\Enums\InvoiceStatus;
use App\Enums\MediaCollection;
use App\Enums\MethodCommand;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Brand;
use App\Models\Carrier;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Partner;
use App\Models\Route;
use App\Models\Vehicle;
use App\Models\Romooc;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        try {

            $limit = $request->input('limit', 100);
            $data = Booking::index($request)->paginate($limit);

            $resource = BookingResource::collection($data)->response()->getData();
            $sumData = [
                'page' => [
                    'revenue' => $data->sum('invoice.price'),
                    'fee_collect' => 0,
                    'fee_anchor' => 0,
                ],
                'month' => [
                    'revenue' => Booking::index($request)->select((new Booking())->getTable() . '.id')->get()->sum('invoice.price'),
                    'fee_collect' => 0,
                    'fee_anchor' => 0,
                ],
            ];

            $resource->sumData = $sumData;
            return $this->responseApiSuccess($resource);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function master(Request $request)
    {
        $data['customers'] = Customer::all();
        $data['routes'] = Route::all();
        $data['partners'] = Partner::all();
        $data['carriers'] = Carrier::index($request)->get();
        $data['vehicle'] = Vehicle::all();
        $data['romooc'] = Romooc::all();

        return $this->responseApiSuccess($data);
    }

    public function store(Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'booking.is_home_vehicle' => 'required',
                'booking.is_has_partner' => 'required',
                'booking.fee_transport_type' => 'required',
            ], []);
            if ($validator->fails())
                return $this->responseApiError($validator->errors()->first(), $validator->errors());

            $data = [
                'user_id' => $user->id,
                'is_home_vehicle' => $request->booking['is_home_vehicle'],
                'fee_transport_type' => $request->booking['fee_transport_type'],
                'customer_id' => $request->booking['customer_id'],
                'route_id' => $request->route['id'],
            ];

            if ($request->booking['is_has_partner']) {
                $data['is_has_partner'] = $request->booking['is_has_partner'];
                $data['partner_id'] = $request->booking['partner_id'];
                $data['partner_cont_quantity'] = $request->booking['partner_cont_quantity'];
                $data['partner_cont_type'] = $request->booking['partner_cont_type'];
                $data['partner_price'] = $request->booking['partner_price'];
                $data['partner_note'] = $request->booking['partner_note'];
            }

            $booking = Booking::create($data);
            if ($request->booking['fee_transport_type'] == FeeTransportType::FROM_INPUT_PRICE->value) {

                $invoice = $booking->invoice()->create([
                    'product_type' => $request->invoice['product_type'] ?? 0,
                    'carrier_id' => $request->invoice['carrier_id'] ?? 0,
                    'carrier_number' => $request->invoice['carrier_number'] ?? 0,
                    'time_transport' => $request->invoice['time_transport'] ?? null,
                    'time_down_the_line' => $request->invoice['time_down_the_line'] ?? null,
                    'method_command' => $request->invoice['method_command'] ?? 0,
                    'method_command_number' => $request->invoice['method_command_number'] ?? 0,
                    'booking_code' => $request->invoice['booking_code'] ?? null,
                    'driver_salary' => $request->invoice['driver_salary'] ?? 0,
                    'location_start' => $request->invoice['location_start'] ?? null,
                    'location_end' => $request->invoice['location_end'] ?? null,

                    'km' => $request->invoice['km'] ?? 0,
                    'cont_type' => $request->invoice['cont_type'] ?? null,
                    'is_1_axle_vehicle' => $request->invoice['is_1_axle_vehicle'] ?? null,
                    'is_2_axle_vehicle' => $request->invoice['is_2_axle_vehicle'] ?? null,
                    'cont_salary' => $request->invoice['cont_salary'] ?? 0,
                    'route_salary' => $request->invoice['route_salary'] ?? 0,
                    'price' => $request->invoice['price'] ?? 0,
                    'commission' => $request->invoice['commission'] ?? 0,
                    'quantity' => $request->invoice['quantity'] ?? 0,
                ]);

                if ($request->taskTransports) {
                    $invoice->taskTransports()->create($request->taskTransports);
                }
                if ($request->trips) {
                    foreach ($request->trips as $key => $value) {
                        $invoice->trips()->create($value);
                    }
                }

                $invoicePrice = 0;
                // tạo vận đơn

                // với lệnh điều động
                if ($invoice->method_command_number) {
                    $commandMobiles = [];
                    for ($i = 0; $i < $invoice->method_command_number; $i++) {
                        $commandMobiles[] = $invoice->commandMobiles()->create([
                            'booking_id' => $invoice->booking_id,
                            'route_id' => $request->route['id'],
                            'quantity' => 0,
                            'product_type' => $invoice->product_type,
                            'advance_money' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'salary_total' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'anchor_vehicle' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'cont_cut' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'price' => $invoice->price, // cột này chưa biết làm sao có thể nó sẽ set sau
                        ]);

                        $invoicePrice += $invoice->price;
                    }

                    for ($i = 0; $i < $invoice->quantity; $i++) {
                        $indexCommand = $i % $invoice->method_command_number;
                        $commandMobiles[$indexCommand]->conts()->create([
                            'invoice_id' => $invoice->id,
                            'code' => $request?->conts[$i]['code'] ?? '',
                            'seal' => $request?->conts[$i]['seal'] ?? '',
                            'gross' => $request?->conts[$i]['gross'] ?? '',
                        ]);

                        $commandMobiles[$indexCommand]->increment('quantity');
                    }
                }

                // với chọn sẵn tài xế
                else if ($request->drivers) {
                    $commandMobiles = [];
                    foreach ($request->drivers as $i => $driver) {
                        $commandMobiles[] = $invoice->commandMobiles()->create([
                            'booking_id' => $invoice->booking_id,
                            'driver_id' => $driver,
                            'route_id' => $request->route['id'],

                            'quantity' => 0,
                            'product_type' => $invoice->product_type,
                            'advance_money' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'salary_total' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'anchor_vehicle' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'cont_cut' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'price' => $invoice->price, // cột này chưa biết làm sao có thể nó sẽ set sau

                        ]);

                        $invoicePrice += $invoice->price;
                    }

                    for ($i = 0; $i < $invoice->quantity; $i++) {
                        $indexCommand = $i % count($request->drivers);
                        $commandMobiles[$indexCommand]->conts()->create([
                            'invoice_id' => $invoice->id,
                            'code' => $request?->conts[$i]['code'] ?? '',
                            'seal' => $request?->conts[$i]['seal'] ?? '',
                            'gross' => $request?->conts[$i]['gross'] ?? '',
                        ]);

                        $commandMobiles[$indexCommand]->increment('quantity');
                    }
                }

                $invoice->update([
                    'price' => $invoicePrice,
                ]);

                //upload file
                if ($request->file('images') && count($request->file('images'))) foreach ($request->file('images') as $key => $value) {
                    $invoice->addMedia($value)->toMediaCollection(MediaCollection::IMAGE->value);
                }
                if ($request->file('addable_files') && count($request->file('addable_files'))) foreach ($request->file('addable_files') as $key => $value) {
                    $invoice->addMedia($value)->toMediaCollection(MediaCollection::DOCUMENT->value);
                }
            }

            return $this->responseApiSuccess(new BookingResource($booking));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $data = Booking::findOrFail($id);

            return $this->responseApiSuccess(new BookingResource($data));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function update(Booking $booking, Request $request)
    {
        try {
            $user = $request->user();
            $validator = Validator::make($request->all(), [
                'booking.is_home_vehicle' => 'required',
                // 'booking.is_has_partner' => 'required',
                // 'booking.fee_transport_type' => 'required',
            ], []);
            if ($validator->fails())
                return $this->responseApiError($validator->errors()->first(), $validator->errors());

            if ($booking?->invoice?->status && $booking?->invoice?->status != InvoiceStatus::NEW)
                return $this->responseApiError(__('Vận đơn có lệnh điều động đang hoạt động. Không thể chỉnh sửa'));

            $data = [
                'user_id' => $user->id,
                // 'is_home_vehicle' => $request->booking['is_home_vehicle'],
                // 'fee_transport_type' => $request->booking['fee_transport_type'],
                'customer_id' => $request->booking['customer_id'],
                'route_id' => $request->booking['route_id'],
            ];

            // if ($request->booking['is_has_partner']) {
            //     $data['is_has_partner'] = $request->booking['is_has_partner'];
            //     $data['partner_id'] = $request->booking['partner_id'];
            //     $data['partner_cont_quantity'] = $request->booking['partner_cont_quantity'];
            //     $data['partner_cont_type'] = $request->booking['partner_cont_type'];
            //     $data['partner_price'] = $request->booking['partner_price'];
            //     $data['partner_note'] = $request->booking['partner_note'];
            // }

            $booking->update($data);
            if ($request->booking['fee_transport_type'] == FeeTransportType::FROM_INPUT_PRICE->value) {

                $invoice = $booking->invoice;
                $invoice->update([
                    'product_type' => $request->booking['invoice']['product_type'] ?? $booking->invoice->product_type ?: 0,
                    'carrier_id' => $request->booking['invoice']['carrier_id'] ?? $booking->invoice->carrier_id ?: 0,
                    'carrier_number' => $request->booking['invoice']['carrier_number'] ?? $booking->invoice->carrier_number ?: 0,
                    'time_transport' => $request->booking['invoice']['time_transport'] ?? $booking->invoice->time_transport ?: null,
                    'time_down_the_line' => $request->booking['invoice']['time_down_the_line'] ?? $booking->invoice->time_down_the_line ?: null,
                    'method_command' => $request->booking['invoice']['method_command'] ?? $booking->invoice->method_command ?: 0,
                    'method_command_number' => $request->booking['invoice']['method_command_number'] ?? $booking->invoice->method_command_number ?: 0,
                    'booking_code' => $request->booking['invoice']['booking_code'] ?? $booking->invoice->booking_code ?: null,
                    'driver_salary' => $request->booking['invoice']['driver_salary'] ?? $booking->invoice->driver_salary ?: 0,
                    'location_start' => $request->booking['invoice']['location_start'] ?? $booking->invoice->location_start ?: null,
                    'location_end' => $request->booking['invoice']['location_end'] ?? $booking->invoice->location_end ?: null,

                    'km' => $request->booking['invoice']['km'] ?? $booking->invoice->km ?: 0,
                    'cont_type' => $request->booking['invoice']['cont_type'] ?? $booking->invoice->cont_type ?: null,
                    'is_1_axle_vehicle' => $request->booking['invoice']['is_1_axle_vehicle'] ?? $booking->invoice->is_1_axle_vehicle ?: null,
                    'is_2_axle_vehicle' => $request->booking['invoice']['is_2_axle_vehicle'] ?? $booking->invoice->is_2_axle_vehicle ?: null,
                    'cont_salary' => $request->booking['invoice']['cont_salary'] ?? $booking->invoice->cont_salary ?: 0,
                    'route_salary' => $request->booking['invoice']['route_salary'] ?? $booking->invoice->route_salary ?: 0,
                    'price' => $request->booking['invoice_price'] ?? $booking->invoice->price ?: 0,
                    'commission' => $request->booking['invoice']['commission'] ?? $booking->invoice->commission ?: 0,
                    'quantity' => $request->booking['invoice']['quantity'] ?? $booking->invoice->quantity ?: 0,
                ]);

                if ($request->booking['invoice']['taskTransports'] ?? null) {
                    $invoice->taskTransports()->delete();
                    $invoice->taskTransports()->create($request->booking['invoice']['taskTransports']);
                }
                if ($request->booking['invoice']['trips'] ?? null) {
                    $invoice->trips()->delete();
                    foreach ($request->booking['invoice']['trips'] as $key => $value) {
                        $invoice->trips()->create($value);
                    }
                }

                $invoicePrice = 0;
                // tạo vận đơn
                $invoice->commandMobiles()->delete();
                $conts = $invoice->conts;
                $invoice->conts()->delete();
                // với lệnh điều động
                if ($invoice->method_command_number) {
                    $commandMobiles = [];
                    for ($i = 0; $i < $invoice->method_command_number; $i++) {
                        $commandMobiles[] = $invoice->commandMobiles()->create([
                            'booking_id' => $invoice->booking_id,
                            'route_id' => $request->booking['route_id'],
                            'quantity' => 0,
                            'product_type' => $invoice->product_type,
                            'advance_money' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'salary_total' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'anchor_vehicle' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'cont_cut' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'price' => $invoice->price, // cột này chưa biết làm sao có thể nó sẽ set sau
                        ]);

                        $invoicePrice += $invoice->price;
                    }

                    for ($i = 0; $i < $invoice->quantity; $i++) {
                        $indexCommand = $i % $invoice->method_command_number;
                        $commandMobiles[$indexCommand]->conts()->create([
                            'invoice_id' => $invoice->id,
                            'code' => $conts[$i]['code'] ?? '',
                            'seal' => $conts[$i]['seal'] ?? '',
                            'gross' => $conts[$i]['gross'] ?? '',
                        ]);

                        $commandMobiles[$indexCommand]->increment('quantity');
                    }
                }

                // với chọn sẵn tài xế
                else if ($request->drivers) {
                    $commandMobiles = [];
                    foreach ($request->drivers as $i => $driver) {
                        $commandMobiles[] = $invoice->commandMobiles()->create([
                            'booking_id' => $invoice->booking_id,
                            'driver_id' => $driver,
                            'route_id' => $request->booking['route_id'],

                            'quantity' => 0,
                            'product_type' => $invoice->product_type,
                            'advance_money' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'salary_total' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'anchor_vehicle' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'cont_cut' => 0, // cột này chưa biết làm sao có thể nó sẽ set sau
                            'price' => $invoice->price, // cột này chưa biết làm sao có thể nó sẽ set sau

                        ]);

                        $invoicePrice += $invoice->price;
                    }

                    for ($i = 0; $i < $invoice->quantity; $i++) {
                        $indexCommand = $i % count($request->drivers);
                        $commandMobiles[$indexCommand]->conts()->create([
                            'invoice_id' => $invoice->id,
                            'code' => $request?->conts[$i]['code'] ?? '',
                            'seal' => $request?->conts[$i]['seal'] ?? '',
                            'gross' => $request?->conts[$i]['gross'] ?? '',
                        ]);

                        $commandMobiles[$indexCommand]->increment('quantity');
                    }
                }

                $invoice->update([
                    'price' => $invoicePrice,
                ]);

                //upload file
                if ($request->file('images') && count($request->file('images'))) {
                    $invoice->clearMediaCollection(MediaCollection::IMAGE->value);
                    foreach ($request->file('images') as $key => $value) {
                        $invoice->addMedia($value)->toMediaCollection(MediaCollection::IMAGE->value);
                    }
                }
                if ($request->file('addable_files') && count($request->file('addable_files'))) {
                    $invoice->clearMediaCollection(MediaCollection::DOCUMENT->value);
                    foreach ($request->file('addable_files') as $key => $value) {
                        $invoice->addMedia($value)->toMediaCollection(MediaCollection::DOCUMENT->value);
                    }
                }
            }

            return $this->responseApiSuccess(new BookingResource($booking));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function destroy(Request $request, Booking $booking)
    {
        try {
            if ($booking?->invoice?->status && $booking?->invoice?->status != InvoiceStatus::NEW)
                return $this->responseApiError(__('Vận đơn có lệnh điều động đang hoạt động. Không thể chỉnh sửa'));

            $booking->invoice->taskTransports()->delete();
            $booking->invoice->trips()->delete();
            $booking->invoice->conts()->delete();
            $booking->invoice->commandMobiles()->delete();

            $booking->delete();

            return $this->responseApiSuccess(__('Deleted'));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function copy(Request $request, Booking $booking)
    {
        try {
            $user = $request->user();

            //clone booking
            $copyBooking = $booking->replicate();
            $copyBooking->user_id = $user->id;
            $copyBooking->save();

            //clone invoice
            $copyInvoice = $booking->invoice->replicate();
            $copyBooking->invoice()->save($copyInvoice);

            //clone taskTransports
            $copyTaskTransports = $booking->invoice->taskTransports->replicate();
            $copyInvoice->taskTransports()->save($copyTaskTransports);

            //clone trips
            foreach ($booking->invoice->trips as $key => $trip) {
                $copyTrip = $trip->replicate();
                $copyInvoice->trips()->save($copyTrip);
            }

            //clone commands
            foreach ($booking->invoice->commandMobiles as $key => $command) {
                $copyCommand = $command->replicate();
                $copyCommand->booking_id = $copyBooking->id;
                $copyInvoice->commandMobiles()->save($copyCommand);

                //clone conts
                foreach ($command->conts as $key1 => $cont) {
                    $copyCont = $cont->replicate();
                    $copyCont->invoice_id = $copyInvoice->id;
                    $copyCommand->conts()->save($copyCont);
                }
            }

            //clone media
            // if ($request->file('images') && count($request->file('images'))) foreach ($request->file('images') as $key => $value) {
            //     $invoice->addMedia($value)->toMediaCollection(MediaCollection::IMAGE->value);
            // }
            // if ($request->file('addable_files') && count($request->file('addable_files'))) foreach ($request->file('addable_files') as $key => $value) {
            //     $invoice->addMedia($value)->toMediaCollection(MediaCollection::DOCUMENT->value);
            // }

            return $this->responseApiSuccess(new BookingResource($copyBooking));
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }
}
