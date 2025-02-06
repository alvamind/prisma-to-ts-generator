// prisma-to-ts-generator/src/types.ts
import { ImportResolutionConfig } from 'dynamic-import-resolution';

export interface FieldDef {
    name: string;
    type: string;
    isArray: boolean;
    isOptional: boolean;
    comment?: string;
    isPrimaryKey: boolean;
    isForeignKey: boolean;
}
export interface ModelDef { name: string; fields: FieldDef[]; isType: boolean; comments: string[]; }
export interface EnumDef { name: string; values: string[]; }
export type VariantType = 'CreateInput' | 'UpdateInput' | 'Partial' | 'Regular';
export interface GeneratorConfig {
    dirOrFilesPath: string[];
    outputPath: string;
    multiFiles: boolean;
    modelVariants?: VariantType[];
    importResolutionConfig?: ImportResolutionConfig; // Add import resolution config
}
