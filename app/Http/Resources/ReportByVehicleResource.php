<?php

namespace App\Http\Resources;

use App\Enums\MediaCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportByVehicleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'plate' => $this->plate,
            'drivers' => count($this->drivers) > 0 ? $this->drivers[0]?->user->name : null,
            'number_of_cont_shipments' => $this->vehicleMobilization ? count($this->vehicleMobilization) : 0,
            'number_of_bulk_shipments' => 0,
            'order_repair_costs' => 0,
            'other_repair_costs' => 0,
            'tire_replacement_costs' => 0,
            'fuel_costs' => 0,
            'parking_costs' => 0,
            'transportation_costs' => $this->vehicleMobilization ? $this->calculateTotalIncurredCost($this->vehicleMobilization) : 0,
            'total_revenue' => $this->vehicleMobilization ? $this->calculateTotalVehicleMobilizationPrice($this->vehicleMobilization) : 0,
            'bulk_cargo_revenue' => 0,
            'salary' => count($this->drivers) > 0 ? $this->drivers[0]?->salary : 0,
            'profit' => 0,    // use FE to calculate
            'vehicle_salary' => 0,
            'other_fees' => 0,
        ];
    }

    function calculateTotalVehicleMobilizationPrice($vehicleData): int
    {
        $totalPrice = 0;

        if (isset($vehicleData) && !empty($vehicleData)) {
            foreach ($vehicleData as $mobilization) {
                $totalPrice += (int) $mobilization['price'];
            }
        }

        return $totalPrice;
    }
    function calculateTotalIncurredCost($vehicleData): int
    {
        $totalIncurredCost = 0;

        if (isset($vehicleData) && !empty($vehicleData)) {
            foreach ($vehicleData as $mobilization) {
                if (isset($mobilization['incurreds']) && !empty($mobilization['incurreds'])) {
                    foreach ($mobilization['incurreds'] as $incurred) {
                      // Extract and add money from each incurred cost
                      $totalIncurredCost += (int) $incurred['money'];
                    }
                  }
            }
        }

        return $totalIncurredCost;
    }
}
