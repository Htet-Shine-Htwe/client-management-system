<?php

namespace App\Enums;

enum RoleEnum : string
{
    case SUPER_ADMIN = 'super-admin';
    case ADMIN = 'admin';

    public static function getValues(): array
    {
        return [
            self::SUPER_ADMIN,
            self::ADMIN,
        ];
    }

    public static function getKeys(): array
    {
        return array_keys(self::getValues());
    }

    public static function getValuesWithKeys(): array
    {
        return array_combine(self::getKeys(), self::getValues());
    }

}
