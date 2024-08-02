<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Route;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function store(Request $request)
    {
        Route::insert([
            'code' => $request->code ?: null,
            'name' => $request->name,
            'km' => $request->km ?: 0,
            'cont_type' => $request->cont_type ?: null,
            'is_1_axle_vehicle' => $request->is_1_axle_vehicle ?: null,
            'is_2_axle_vehicle' => $request->is_2_axle_vehicle ?: null,
            'cont_salary' => $request->cont_salary ?: 0,
            'route_salary' => $request->route_salary ?: 0,
            'price' => $request->price ?: 0,
            'commission' => $request->commission ?: 0,
            'quantity' => $request->quantity ?: 0,
        ]);
        $route = Route::all();
        return $this->responseApiSuccess($route);
    }
}
