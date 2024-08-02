<?php

namespace App\Enums;

enum CommandMobileStatus: int
{
    use EnumTrait;

    case CANCEL = -1;
    case NEW = 0;
    case GET_CONT_GOOD = 1;
    case CUT_MOOC_DOWN_GOOD = 2;
    case GET_CONT_EMPTY = 3;
    case DOWN_PACKING = 4;
    case COMPLETED = 5;
}
