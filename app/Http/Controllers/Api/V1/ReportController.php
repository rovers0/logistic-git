<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Enums\MediaCollection;
use App\Enums\DocumentType;
use App\Enums\FeeIncurredType;
use App\Http\Controllers\Controller;
use App\Http\Resources\VehicleResource;
use App\Http\Resources\ReportByVehicleResource;
use App\Models\CommandMobile;
use App\Models\Vehicle;
use App\Models\Driver;
use App\Models\User;
use App\Models\VehicleDocument;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\SimpleExcel\SimpleExcelReader;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        try {

            $commands = CommandMobile::report($request)->get();
            $year = $request->input('year', now()->year);

            for ($i = 0; $i < 12; $i++) {
                $month = $i + 1;
                $from = Carbon::parse("$year-$month-01");
                $to = Carbon::parse("$year-$month-01")->endOfMonth();
                $dataReport = $this->getReport($commands, $from, $to, $year, $month);
                $period = "Tháng $month-$year";
                $dataReport['period'] = $period;
                $data['months'][$i + 1] = $dataReport;
            }

            for ($i = 0; $i < 4; $i++) {
                $month = $i * 3 + 1;
                $from = Carbon::parse("$year-$month-01");
                $to = Carbon::parse("$year-$month-01")->endOfQuarter();
                $dataReport = $this->getReport($commands, $from, $to);
                $period = $i == 0 ? "Quý I-$year" : ($i == 1 ? "Quý II-$year" : ($i == 2 ? "Quý III-$year" : "Quý IV-$year"));
                $dataReport['period'] = $period;
                $data['quarters'][$i + 1] = $dataReport;
            }

            $data['year'] = $this->getReport($commands);

            return $this->responseApiSuccess($data);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function getReport($commands, $from = null, $to = null, $year = null, $month = null)
    {
        $commands = $commands
            ->when($from, fn ($q) => $q->where('invoice.' . CommandMobile::REPORT_FIELD_FILTER, '>=', $from))
            ->when($to, fn ($q) => $q->where('invoice.' . CommandMobile::REPORT_FIELD_FILTER, '<=', $to))->map(function ($item) {
                $item->total_incurred = $item->incurreds->sum('money');
                $item->total_incurred_transport = $item->incurreds->where('fee.type', FeeIncurredType::TRANSPORT->value)->sum('money');
                $item->total_incurred_fuel = $item->incurreds->where('fee.type', FeeIncurredType::FUEL->value)->sum('money');
                $item->total_incurred_warehouse_export_product = $item->incurreds->whereIn('fee.type', [FeeIncurredType::TIRE->value, FeeIncurredType::OTHER->value])->sum('money');
                $item->total_incurred_suggestion_fix = $item->incurreds->where('fee.type', FeeIncurredType::SUGGESTION_FIX->value)->sum('money');
                $item->total_incurred_some_fix = $item->incurreds->where('fee.type', FeeIncurredType::SOME_FIX->value)->sum('money');
                return $item;
            });

        $shipping = $commands->where('partner_id', 0)->sum('price');
        $outside = $commands->where('partner_id', '>', 0)->sum('price');
        $salary = $commands->sum('salary_total');

        $incurred = $commands->sum('total_incurred');
        $incurredTransport = $commands->sum('total_incurred_transport');
        $incurredFuel = $commands->sum('total_incurred_fuel');
        $incurredWarehouse = $commands->sum('total_incurred_warehouse_export_product');
        $incurredSuggestion = $commands->sum('total_incurred_suggestion_fix');
        $incurredSome = $commands->sum('total_incurred_some_fix');

        $salaryHr = 0;
        $vatIn = 0;
        $vatOut = 0;

        $payDO = 0;
        $holiday = 0;
        $telecommunication = 0;
        $office = 0;
        $mobile = 0;
        $electrical = 0;

        $data = [
            'revenue_shipping' => $shipping,
            'revenue_outside' => $outside,
            'staff_salary' => $salaryHr,
            'driver_salary' => $salary,
            'total_incurred' => $incurred,
            'total_profit' => $shipping + $outside - $incurred,
            'vat_in' => $vatIn,
            'vat_out' => $vatOut,
        ];

        $detail = [];

        $detail['fee_permanent'] = [
            'total' => 0,
            'percent' => 0,
        ];

        $totalFee = $salaryHr + $salary + $incurredTransport + $incurredFuel + $incurredWarehouse + $incurredSuggestion + $incurredSome + $payDO
            + $holiday + $telecommunication + $office + $mobile + $electrical;

        $detail['fee_activities'] = [
            'salary_hr' => [
                'total' => $salaryHr,
                'percent' => round($salaryHr / ($totalFee ?: 1) * 100, 2),
            ],
            'salary_driver' => [
                'total' => $salary,
                'percent' => round($salary / ($totalFee ?: 1) * 100, 2),
            ],
            'total_fee_transport' => [
                'total' => $incurredTransport,
                'percent' => round($incurredTransport / ($totalFee ?: 1) * 100, 2),
            ],
            'total_fee_fuel' => [
                'total' => $incurredFuel,
                'percent' => round($incurredFuel / ($totalFee ?: 1) * 100, 2),
            ],
            'total_fee_warehouse' => [
                'total' => $incurredWarehouse,
                'percent' => round($incurredWarehouse / ($totalFee ?: 1) * 100, 2),
            ],
            'total_fee_suggestion' => [
                'total' => $incurredSuggestion,
                'percent' => round($incurredSuggestion / ($totalFee ?: 1) * 100, 2),
            ],
            'total_fee_some' => [
                'total' => $incurredSome,
                'percent' => round($incurredSome / ($totalFee ?: 1) * 100, 2),
            ],
            'pay_do' => [
                'total' => $payDO,
                'percent' => round($payDO / ($totalFee ?: 1) * 100, 2),
            ],
            'holiday' => [
                'total' => $holiday,
                'percent' => round($holiday / ($totalFee ?: 1) * 100, 2),
            ],
            'telecommunication' => [
                'total' => $telecommunication,
                'percent' => round($telecommunication / ($totalFee ?: 1) * 100, 2),
            ],
            'office' => [
                'total' => $office,
                'percent' => round($office / ($totalFee ?: 1) * 100, 2),
            ],
            'mobile' => [
                'total' => $mobile,
                'percent' => round($mobile / ($totalFee ?: 1) * 100, 2),
            ],
            'electrical' => [
                'total' => $electrical,
                'percent' => round($electrical / ($totalFee ?: 1) * 100, 2),
            ],
            'total_all' => [
                'total' => $totalFee,
                'percent' => 100,
            ],
            'total_outsize_all' => [
                'total' => $outside,
                'percent' => 0,
            ],
        ];

        $bulk = 0;
        $detail['revenue'] = [
            'total_fee_transport_cont_inside' => $shipping,
            'total_fee_transport_bulk' => $bulk, //  hàng rời
            'total_revenue_outside' => $outside,
            'total_revenue_debts_cont' => 0,
            'total_total_fee_transport_cont_inside_outside' => $outside + $shipping + $bulk,
            'total_revenue' => $shipping + $outside,
            'total_fee' => $incurred,
            'total_profit' => $shipping + $outside - $incurred,
        ];

        $data['detail'] = $detail;
        if ($year && $month) {
            $data['year'] = $year;
            $data['month'] = $month;
        }

        return $data;
    }

    public function master()
    {
        try {
            $data['plate'] = Vehicle::pluck('plate');
            $data['driver'] = User::where('role', UserRole::DRIVER)->get();
            return $this->responseApiSuccess($data);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function show(Request $request)
    {
        try {
            $commands = CommandMobile::report($request)->get();

            $year = $request->input('year', now()->year);
            $month = $request->input('month', now()->month);

            $from = Carbon::parse("$year-$month-01");
            $to = Carbon::parse("$year-$month-01")->endOfMonth();
            $dataReport = $this->getReport($commands, $from, $to);

            return $this->responseApiSuccess($dataReport['detail']);
        } catch (\Exception $error) {
            return $this->responseApiError(__('Có lỗi xảy ra! Vui lòng thử lại sau.'), $error->getMessage());
        }
    }

    public function reportByVehicle(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'year' => 'required|digits:4|integer|min:1900',
            'month' => 'required|in:1,2,3,4,5,6,7,8,9,10,11,12',
            'plate' => 'array',
            'status' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return $this->responseApiError($validator->errors()->first(), $validator->errors());
        }

        $vehicles = CommandMobile::reportVehicle($request)->get()->groupBy('vehicle_id')
            ->map(function ($commands) {
                $vehicle = $commands[0]->vehicle;
                $km = $commands->sum('invoice.km') ?? 0;
                $revenue = $commands->sum('price');

                $incurreds = collect();
                foreach ($commands as $key => $value) {
                    $incurreds = $incurreds->mergeRecursive($value->incurreds);
                }

                $feeOther = $incurreds->where('fee.type', FeeIncurredType::OTHER->value)->sum('money');
                $feeSuggestion = $incurreds->where('fee.type', FeeIncurredType::SUGGESTION_FIX->value)->sum('money');
                $feeSome = $incurreds->where('fee.type', FeeIncurredType::SOME_FIX->value)->sum('money');
                $feeTire = $incurreds->where('fee.type', FeeIncurredType::TIRE->value)->sum('money');
                $feeFuel = $incurreds->where('fee.type', FeeIncurredType::FUEL->value)->sum('money');
                $feeTransport = $incurreds->where('fee.type', FeeIncurredType::TRANSPORT->value)->sum('money');
                $feeAnchor = $incurreds->where('fee.type', FeeIncurredType::ANCHOR->value)->sum('money');

                $bonusMoney = $commands->sum('bonus_driver_money');
                $bonusCount = $commands->where('bonus_driver_money', '>', 0)->count();

                $routeLeave = 0;
                $revenueLeave = 0;
                $driverSalary = $vehicle->drivers ? $vehicle->drivers->first()?->salary : 0;
                $driverName = $vehicle->drivers ? $vehicle->drivers->first()?->user->name : null;

                $data = [
                    'idx' => $vehicle->idx,
                    'plate' => $vehicle->plate,
                    'km' => $km,
                    'drivers' => $driverName,
                    'driver_salary' => $driverSalary,
                    'number_of_cont_shipments' => $commands->count(),
                    'number_of_bulk_shipments' => $routeLeave,
                    'order_repair_costs' => $feeSuggestion,
                    'repair_costs' => $feeSome,
                    'tire_replacement_costs' => $feeTire,
                    'fuel_costs' => $feeFuel,
                    'transportation_costs' => $feeTransport,
                    'parking_costs' => $feeAnchor,
                    'salary' => [
                        'bonus_count' => $bonusCount,
                        'bonus_money' => $bonusMoney,
                    ],
                    'other_fees' => $feeOther,
                    'total_revenue' => $revenue,
                    'bulk_cargo_revenue' => $revenueLeave,
                    'profit' =>  $revenue + $revenueLeave - $driverSalary - $bonusMoney - $feeSuggestion - $feeSome - $feeTire - $feeFuel - $feeTransport - $feeAnchor - $feeOther,
                ];

                return $data;
            })
            ->values();

        return $this->responseApiSuccess($vehicles);
    }
}
