// src/generator.ts
import { getSchema } from '@mrleebo/prisma-ast';
import path from 'path';
import { GeneratorConfig, ModelDef, EnumDef, VariantType } from './types';
import { processModel, processEnum } from './ast-processor';
import { generateEnum, generateModel } from './ts-generator';
import { readFile, findFilesByExtension, ensureDirExists, resolveDirPath, resolveOutputPath, writeFile, isDirectory } from './file-utils';
import { needsHelperTypes } from './type-mapping';

// Embed the content of helper-types.ts directly
const helperTypesContent = `
// @ts-nocheck
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
`;

export const generate = async (config: GeneratorConfig) => {
    const { dirOrFilesPath, outputPath, multiFiles, modelVariants } = config;
    const allModels: ModelDef[] = [];
    const allEnums: EnumDef[] = [];
    const allTypes: ModelDef[] = [];
    const resolvedSchemaPaths: string[] = [];
    let hasHelperTypes = false;

    const outDir = resolveOutputPath(outputPath);
    const resolvedModelDirPath = path.join(outDir, 'model');
    const resolvedEnumDirPath = path.join(outDir, 'enum');
    const resolvedHelperDirPath = path.join(outDir, 'helper');

    dirOrFilesPath.forEach(schemaPath => {
        const resolvedPaths = path.isAbsolute(schemaPath) ? [schemaPath] : [path.join(process.cwd(), schemaPath)];
        resolvedPaths.forEach(p => {
            if (isDirectory(p)) resolvedSchemaPaths.push(...findFilesByExtension(p, '.prisma'));
            else resolvedSchemaPaths.push(p);
        });
    });

    resolvedSchemaPaths.forEach(prismaSchemaPath => {
        const schema = getSchema(readFile(prismaSchemaPath));
        schema.list.forEach((node) => {
            switch (node.type) {
                case 'model': allModels.push(processModel(node, false)); break;
                case 'enum': allEnums.push(processEnum(node)); break;
                case 'type': allTypes.push(processModel(node, true)); break;
            }
        });
    });

    hasHelperTypes = needsHelperTypes(allModels, allTypes);

    if (multiFiles) {
        [resolvedModelDirPath, resolvedEnumDirPath, resolvedHelperDirPath].forEach(ensureDirExists);
        if (hasHelperTypes) writeFile(path.join(resolvedHelperDirPath, 'helper-types.ts'), helperTypesContent); // Use the string constant
    } else {
        ensureDirExists(outDir);
        if (hasHelperTypes) writeFile(path.join(outDir, 'helper-types.ts'), helperTypesContent); // Use the string constant
    }

    let indexContent = '';
    if (hasHelperTypes && !multiFiles) indexContent += `import type { DecimalJsLike, JsonValueType } from './helper-types';\n\n`;

    allEnums.forEach(enumDef => { indexContent += generateEnum(enumDef, outDir, multiFiles, resolvedEnumDirPath); });

    [...allTypes, ...allModels].forEach(model => {
        const variants = (modelVariants || ['Regular']) as VariantType[];
        variants.forEach(variant => {
            indexContent += generateModel(model, allModels, allEnums, allTypes, outDir, multiFiles, hasHelperTypes, variant, modelVariants, resolvedModelDirPath, resolvedEnumDirPath, resolvedHelperDirPath);
        });
    });

    if (!multiFiles) writeFile(path.join(outDir, 'index.ts'), indexContent);
};
