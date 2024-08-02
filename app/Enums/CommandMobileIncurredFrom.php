<?php

namespace App\Enums;

enum CommandMobileIncurredFrom: int
{
    use EnumTrait;

    case DRIVER = 1;
    case HR = 2;
    case COMPANY = 3;
}
