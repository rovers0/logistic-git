<?php

namespace App\Enums;

enum MediaCollection: string
{
    use EnumTrait;

    case AVATAR = 'avatars';
    case IMAGE = 'images';
    case DOCUMENT = 'documents';
    case EXPORT = 'exports';
    case IMPORT = 'imports';
    case CV_ROOT = 'cv-roots';
}
