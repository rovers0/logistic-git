<?php

namespace App\Enums;

enum UserRole: int
{
    use EnumTrait;

    case ADMIN = 2 ** 0;
    case DRIVER = 2 ** 1;
}
