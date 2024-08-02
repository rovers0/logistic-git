<?php

namespace App\Enums;

enum TripType: int
{
    use EnumTrait;

    case START = 1;
    case STOP = 2;
    case CENTER = 3;
}
