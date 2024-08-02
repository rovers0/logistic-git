<?php

namespace App\Enums;

enum FeeTransportType: int
{
    use EnumTrait;

    case FROM_CONTRACT = 1;
    case FROM_PRICE_GENERAL = 2;
    case FROM_INPUT_PRICE = 3;
}
