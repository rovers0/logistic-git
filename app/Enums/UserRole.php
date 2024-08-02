<?php

namespace App\Enums;

enum UserRole: int
{
    use EnumTrait;

    case ADMIN = 2 ** 0;
    case DRIVER = 2 ** 1;
    case ACCOUNTANT = 2 ** 2;
    case OP = 2 ** 3;
    case VEHICLE_CONTROL = 2 ** 4;
}
