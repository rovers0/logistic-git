<?php

namespace App\Enums;

enum InvoiceStatus: int
{
    use EnumTrait;

    case NEW = 0;
    case COMMAND_RUNNING = 1;
}
