// type-mapping.ts
import { FieldDef, ModelDef, EnumDef } from './types';

export const typeMap: Record<string, string> = {
    String: 'string', Decimal: 'DecimalJsLike', Int: 'number', Float: 'number',
    Boolean: 'boolean', DateTime: 'Date', Json: 'JsonValueType', Bytes: 'Buffer', BigInt: 'bigint',
};

export const getTsType = (
    type: string, field: FieldDef, currModel: ModelDef, allModels: ModelDef[],
    enums: EnumDef[], types: ModelDef[], imports: Set<string>, multiFiles: boolean
): string => {
    const cleanType = type.replace('[]', '');
    if (typeMap[cleanType]) return typeMap[cleanType];
    if (enums.some(e => e.name === cleanType)) { if (multiFiles) imports.add(`enum/${cleanType}`); return cleanType; }
    if (allModels.some(m => m.name === cleanType && !m.isType) || types.some(t => t.name === cleanType)) {
        if (multiFiles && cleanType.trim().toLowerCase() !== currModel.name.trim().toLowerCase()) imports.add(`model/${cleanType}`);
        return cleanType;
    }
    return 'string';
};

export const needsHelperTypes = (models: ModelDef[], types: ModelDef[]): boolean =>
    [...models, ...types].some(model => model.fields.some(f => f.type === 'Decimal' || f.type === 'Json'));
