<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_home_vehicle', 'fee_transport_type', 'customer_id',
        'route_id', 'is_has_partner', 'partner_id', 'partner_note',
        'partner_cont_quantity', 'partner_cont_type', 'partner_price',
        'user_id',
    ];

    public function scopeIndex($query, $request)
    {
        $t1 = $this->getTable();
        return $query->join('invoices', 'invoices.booking_id', "$t1.id")
            ->with(['invoice.commandMobiles.conts'])
            ->when($request->has('route_id'), function ($q) use ($request, $t1) {
                return $q->where("$t1.route_id", $request->route_id);
            })
            ->when($request->has('booking_id'), function ($q) use ($request, $t1) {
                return $q->whereIn("$t1.id", explode(',', $request->booking_id));
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
            ->when($request->has('product_type'), function ($q) use ($request) {
                return $q->where("invoices.product_type", $request->product_type);
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
            ->orderBy("$t1.id", 'DESC');
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function route()
    {
        return $this->belongsTo(Route::class);
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function maker()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
