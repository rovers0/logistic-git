<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CommandMobile extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'booking_id', 'invoice_id', 'driver_id', 'route_id', 'romooc_id',
        'vehicle_id', 'partner_id',
        'quantity', 'product_type', 'advance_money', 'bonus_driver_money',
        'salary_total', 'anchor_vehicle', 'cont_cut',
        'price', 'status',
    ];

    public function scopeIndex($query, $request)
    {
        $t1 = $this->getTable();
        return $query->join('invoices', 'invoices.id', "$t1.invoice_id")
            ->with(['incurreds.fee', 'invoice', 'booking.maker'])
            ->when($request->has('command_id'), function ($q) use ($request, $t1) {
                return $q->where("$t1.id", $request->command_id);
            })
            ->when($request->has('booking_id'), function ($q) use ($request, $t1) {
                return $q->whereIn("$t1.booking_id", explode(',', $request->booking_id));
            })
            ->when($request->has('booking_code'), function ($q) use ($request) {
                return $q->where('invoices.booking_code', 'like', "%$request->booking_code%");
            })
            ->when($request->has('date_from'), function ($q) use ($request, $t1) {
                return $q->where("$t1.created_at", '>=', $request->date_from);
            })
            ->when($request->has('date_to'), function ($q) use ($request, $t1) {
                return $q->where("$t1.created_at", '<=', $request->date_to);
            })
            ->when($request->has('customer_id'), function ($q) use ($request, $t1) {
                return $q->where("$t1.customer_id", $request->customer_id);
            })
            ->when($request->has('year'), function ($q) use ($request, $t1) {
                return $q->whereYear("$t1.created_at", $request->year);
            })
            ->when($request->has('month'), function ($q) use ($request, $t1) {
                return $q->whereMonth("$t1.created_at", $request->month);
            })
            ->when($request->has('quantity'), function ($q) use ($request, $t1) {
                // return $q->whereMonth("$t1.created_at", $request->month);
            })
            ->when($request->has('status'), function ($q) use ($request, $t1) {
                // return $q->whereMonth("$t1.created_at", $request->month);
            })
            ->select("$t1.*")
            ->orderBy("$t1.id", 'DESC');
    }

    public function incurreds()
    {
        return $this->hasMany(CommandMobileIncurred::class);
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function conts()
    {
        return $this->hasMany(Cont::class);
    }

    public function closedUser()
    {
        return $this->belongsTo(User::class, 'closed_at_by_user_id');
    }

    public function route()
    {
        return $this->belongsTo(Route::class);
    }

    public function romooc()
    {
        return $this->belongsTo(Romooc::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    public function statuses()
    {
        return $this->hasMany(CommandStatus::class);
    }

    const REPORT_FIELD_FILTER = 'time_transport';
    public function scopeReport($query, $request)
    {
        return $query
            ->with(['invoice', 'incurreds.fee'])
            ->whereHas('invoice', fn ($q) => $q->whereYear(self::REPORT_FIELD_FILTER, $request->input('year', now()->year)));
        // ->when($request->month, fn ($q) => $q->whereHas('invoice', fn ($q1) => $q1->whereMonth(self::REPORT_FIELD_FILTER, $request->input('month', now()->month))));
    }

    public function scopeReportVehicle($query, $request)
    {
        $plates = $request->input('plate', []);
        $status = $request->input('status', 2);
        return $query
            ->with(['invoice', 'incurreds.fee', 'vehicle'])
            ->whereHas('vehicle', function ($query) use ($request, $plates, $status) {
                $query->{$request->plate ? 'whereIn' : 'whereNotIn'}('plate', $plates);
                $query->where('status', $status >= 2 ? '<>' : '=', $status);
            })
            ->whereHas('invoice', function ($query) use ($request) {
                $query->whereMonth(self::REPORT_FIELD_FILTER, $request->month);
                $query->whereYear(self::REPORT_FIELD_FILTER, $request->year);
            });
    }
}
