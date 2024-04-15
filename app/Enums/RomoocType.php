<?php

namespace App\Enums;

enum RomoocType: int
{
    use EnumTrait;

    case MOC_SAN = 1;
    case MOC_SUONG = 2;
}
