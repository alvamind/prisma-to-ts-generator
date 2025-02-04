// helper-types.ts
import { Prisma } from '@prisma/client';

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;
export const transformJsonNull = (v?: NullableJsonInput) => {
    if (!v || v === 'DbNull') return Prisma.DbNull;
    if (v === 'JsonNull') return Prisma.JsonNull;
    return v;
};
export type JsonValueType = string | number | boolean | null | { [key: string]: JsonValueType | undefined } | JsonValueType[];
export type NullableJsonValueType = JsonValueType | 'DbNull' | 'JsonNull' | null;
export type InputJsonValueType = string | number | boolean | { toJSON: () => unknown } | { [key: string]: InputJsonValueType | null } | (InputJsonValueType | null)[];

export interface DecimalJsLike { d: number[]; e: number; s: number; toFixed(): string; }
export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:.[01]+)?(?:[pP][-+]?\\d+)?|0[oO][0-7]+(?:.[0-7]+)?(?:[pP][-+]?\\d+)?|0[xX][\\da-fA-F]+(?:.[\\da-fA-F]+)?(?:[pP][-+]?\\d+)?|(?:\\d+|\\d*\\.\\d+)(?:[eE][-+]?\\d+)?))$/;
export const isValidDecimalInput = (v?: null | string | number | DecimalJsLike): v is string | number | DecimalJsLike => {
    if (v == null) return false;
    return (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) || (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) || typeof v === 'number';
};
