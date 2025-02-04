export interface FieldDef { name: string; type: string; isArray: boolean; isOptional: boolean; comment?: string; }
export interface ModelDef { name: string; fields: FieldDef[]; isType: boolean; comments: string[]; }
export interface EnumDef { name: string; values: string[]; }
export interface GeneratorConfig { dirOrFilesPath: string[]; outputPath: string; multiFiles: boolean; modelVariants?: string[]; }
