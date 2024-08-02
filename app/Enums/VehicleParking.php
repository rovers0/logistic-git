<?php

namespace App\Enums;

enum VehicleParking: int
{
    use EnumTrait;

    case SLOT0 = 0;
    case SLOT1 = 1;
    case SLOT2 = 2;
    case SLOT3 = 3;
}
