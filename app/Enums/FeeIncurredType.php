<?php

namespace App\Enums;

enum FeeIncurredType: int
{
    use EnumTrait;

    case OTHER = 0;
    case SUGGESTION_FIX = 1;
    case SOME_FIX = 2; // sửa chữa vặt
    case TIRE = 3; // lốp
    case FUEL = 4; // nhiên liệu
    case TRANSPORT = 5; // vận tải
    case ANCHOR = 6; // neo xe
}
