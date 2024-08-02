<?php

namespace App\Enums;

enum CommandMobileIncurredStatus: int
{
    use EnumTrait;

    case REJECT = -1;
    case NEW = 0;
    case CONFIRMED = 1;
}
