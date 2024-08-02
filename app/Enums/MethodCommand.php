<?php

namespace App\Enums;

enum MethodCommand: int
{
    use EnumTrait;

    case BY_COMMAND_NUMBER = 1;
    case BY_DRIVERS = 2;
}
