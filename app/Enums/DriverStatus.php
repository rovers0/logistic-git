<?php

namespace App\Enums;

enum DriverStatus: int
{
    use EnumTrait;

    case ACTIVE = 1;
    case DEACTIVE = 0;
}
