<?php

namespace App\Enums;

enum ImportType: int
{
    use EnumTrait;

    case DRIVER = 1;
    case ROMOOC = 2;
}
