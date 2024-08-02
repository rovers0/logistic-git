<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Carrier;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        $brands = Carrier::index($request)->get();
        return $this->responseApiSuccess($brands);
    }

    public function store(Request $request)
    {
        Carrier::create(['name' => $request->name]);
        $brands = Carrier::index($request)->get();
        return $this->responseApiSuccess($brands);
    }
}
