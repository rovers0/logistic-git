<?php

namespace App\Enums;

enum DocumentType: int
{
    use EnumTrait;

    case VEHICLEINSPECTION = 1;
    case ROADMAINTENANCE = 2;
    case VOLUNTARYINSURANCE = 3;
    case MANDATORYINSURANCE = 4;
    case ROADPERMIT = 5;
}
