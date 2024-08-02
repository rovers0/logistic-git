<?php

namespace App\Enums;

enum Active: int
{
    use EnumTrait;

    case ACTIVE = 1;
    case INACTIVE = 0;
}
