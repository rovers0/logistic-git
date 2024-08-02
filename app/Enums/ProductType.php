<?php

namespace App\Enums;

enum ProductType: int
{
    use EnumTrait;

    case IMPORT = 1;
    case EXPORT = 2;
    case INTERNAL = 3;
}
