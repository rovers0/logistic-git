<?php

namespace App\Enums;

trait EnumTrait
{
    public static function values(): array
    {
        return array_map(static function ($item) {
            return $item->value;
        }, self::cases());
    }

    public static function implodes($separator = ','): string
    {
        return implode($separator, self::values());
    }

    public static function labels(): array
    {
        return array_map(static function ($item) {
            return __($item->name);
        }, self::cases());
    }

    public static function implodesLabel($separator = ','): string
    {
        return implode($separator, self::labels());
    }

    public static function bitValues($value): array
    {
        return array_map(static function ($item) {
            return $item->value;
        }, array_filter(self::cases(), static function ($item) use ($value) {
            return $item->value & $value;
        }));
    }

    public static function bitLabels($value): array
    {
        return array_map(static function ($item) {
            return __($item->name);
        }, array_filter(self::cases(), static function ($item) use ($value) {
            return $item->value & $value;
        }));
    }

    public static function fromName(string $name): self
    {
        foreach (self::cases() as $status) {
            if( $name === $status->name ){
                return $status;
            }
        }
        throw new \ValueError("$name is not a valid backing value for enum " . self::class );
    }
}
