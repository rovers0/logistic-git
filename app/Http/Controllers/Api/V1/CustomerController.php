<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index () {
        $customers = Customer::all();
        return $this->responseApiSuccess($customers);
    }
}
