<?php

namespace App\Enums;

enum CommandMobileIncurredCustomerCollect: int
{
    use EnumTrait;

    case NOT_COLLECT = 0;
    case SAVE_DEBT = 1;
    case COLLECT_SEPARATE = 2;
}
