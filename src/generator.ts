import { getSchema } from '@mrleebo/prisma-ast';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import path from 'path';

interface FieldDef {
  name: string;
  type: string;
  isArray: boolean;
  isOptional: boolean;
  comment?: string;
}

interface ModelDef {
  name: string;
  fields: FieldDef[];
  isType: boolean;
  comments: string[];
}

interface EnumDef {
  name: string;
  values: string[];
}

interface GeneratorConfig {
  dirOrFilesPath: string[];
  outputPath: string;
  multiFiles: boolean;
}

const processObject = (node: any, isType: boolean): ModelDef => ({
  name: node.name,
  isType,
  comments: node.comments?.map((c: any) => c.text) || [],
  fields: (node.properties || [])
    .filter((p: any) => p.type === 'field')
    .map((p: any) => ({
      name: p.name,
      type: typeof p.fieldType === 'string' ? p.fieldType : p.fieldType.name,
      isArray: p.array ?? false,
      isOptional: p.optional || (p.attributes || []).some((attr: any) => attr.name === 'nullable'),
      comment: p.comment,
    })),
});

const processEnum = (node: any): EnumDef => ({
  name: node.name,
  values: node.enumerators
    .filter((e: any) => e.type === 'enumerator')
    .map((e: any) => e.name),
});

const writeContentToFile = (filePath: string, content: string) => {
    writeFileSync(filePath, content.trim() + '\n');
}

const genEnum = (enumDef: EnumDef, outDir: string, multiFiles: boolean): string => {
  const content = `export type ${enumDef.name} = ${enumDef.values.map(v => `'${v}'`).join(' | ')};\n`;
  if (multiFiles) {
      writeContentToFile(path.join(outDir, 'enum', `${enumDef.name}.ts`), content);
      return '';
  }
  return content;
};

const typeMap: Record<string, string> = {
  String: 'string',
  Decimal: 'DecimalJsLike',
  Int: 'number',
  Float: 'number',
  Boolean: 'boolean',
  DateTime: 'Date',
  Json: 'JsonValueType',
  Bytes: 'Buffer',
  BigInt: 'bigint',
};

const getTsType = (
  type: string,
  field: FieldDef,
  currModel: ModelDef,
  allModels: ModelDef[],
  enums: EnumDef[],
  types: ModelDef[],
  imports: Set<string>,
  multiFiles: boolean
): string => {
  const cleanType = type.replace('[]', '');
  if (typeMap[cleanType]) return typeMap[cleanType];
  if (enums.some(e => e.name === cleanType)) {
    if (multiFiles) imports.add(`../enum/${cleanType}`);
    return cleanType;
  }
  if (allModels.some(m => m.name === cleanType && !m.isType) || types.some(t => t.name === cleanType)) {
    if (multiFiles && cleanType.trim().toLowerCase() !== currModel.name.trim().toLowerCase()) imports.add(`../model/${cleanType}`);
    return cleanType;
  }
  return 'string';
};

const genModel = (
  model: ModelDef,
  allModels: ModelDef[],
  enums: EnumDef[],
  types: ModelDef[],
  outDir: string,
  multiFiles: boolean,
  needsHelperTypes: boolean
): string => {
  const imports = new Set<string>();

  let content = model.comments?.map(c => `/// ${c}\n`).join('') || '';

  const fieldsContent = model.fields.map(field => {
    let tsType = getTsType(field.type, field, model, allModels, enums, types, imports, multiFiles);
    if (field.isArray) tsType += '[]';
    if (field.isOptional) tsType += ' | null';
    const commentLine = field.comment ? `  ${field.comment}\n` : '';
    return `${commentLine}  ${field.name}: ${tsType};`;
  }).join('\n');

  let importStatements = '';
  if (multiFiles) {
    importStatements = Array.from(imports).map(i => `import type { ${path.basename(i)} } from '${i}';`).join('\n');
    const needsDecimal = model.fields.some(f => f.type === 'Decimal');
    const needsJson = model.fields.some(f => f.type === 'Json');
    const helperImports = [
      needsDecimal ? `import type { DecimalJsLike } from '../helper/helper-types';` : '',
      needsJson ? `import type { JsonValueType } from '../helper/helper-types';` : '',
    ].filter(Boolean).join('\n');
    importStatements = `${helperImports}\n${importStatements}`;
  }


  const modelContent = `${importStatements.trim()}\n${content}export interface ${model.name} ${fieldsContent ? `{\n${fieldsContent}\n}` : `{}`}\n`;

  if (multiFiles) {
      writeContentToFile(path.join(outDir, 'model', `${model.name}.ts`), modelContent);
      return '';
  }
  return modelContent;
};


const getAllPrismaFiles = (dirPath: string): string[] => {
  const files = readdirSync(dirPath);
  return files.reduce<string[]>((prismaFiles, file) => {
    const filePath = path.join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      return prismaFiles.concat(getAllPrismaFiles(filePath));
    }
    if (file.endsWith('.prisma')) {
      return [...prismaFiles, filePath];
    }
    return prismaFiles;
  }, []);
};


export const generate = (config: GeneratorConfig) => {
  const { dirOrFilesPath, outputPath, multiFiles } = config;
  const allModels: ModelDef[] = [];
  const allEnums: EnumDef[] = [];
  const allTypes: ModelDef[] = [];
  const resolvedSchemaPaths: string[] = [];
  let needsHelperTypes = false;

  dirOrFilesPath.forEach(schemaPath => {
    const stat = statSync(schemaPath);
    if (stat.isDirectory()) {
      resolvedSchemaPaths.push(...getAllPrismaFiles(schemaPath));
    } else {
      resolvedSchemaPaths.push(schemaPath);
    }
  });

  resolvedSchemaPaths.forEach(prismaSchemaPath => {
    const schema = getSchema(readFileSync(prismaSchemaPath, 'utf-8'));
    schema.list.forEach((node) => {
      switch (node.type) {
        case 'model':
          const model = processObject(node, false);
          allModels.push(model);
          if (model.fields.some(f => f.type === 'Decimal' || f.type === 'Json')) {
            needsHelperTypes = true;
          }
          break;
        case 'enum': allEnums.push(processEnum(node)); break;
        case 'type':
          const type = processObject(node, true);
          allTypes.push(type);
          if (type.fields.some(f => f.type === 'Decimal' || f.type === 'Json')) {
              needsHelperTypes = true;
          }
          break;
      }
    });
  });

  const outDir = path.join(process.cwd(), outputPath);
  if (multiFiles) {
      mkdirSync(path.join(outDir, 'model'), { recursive: true });
      mkdirSync(path.join(outDir, 'helper'), { recursive: true });
      mkdirSync(path.join(outDir, 'enum'), { recursive: true });
  } else {
      mkdirSync(outDir, { recursive: true });
  }


  const helperTypesContent = `
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// JSON SECTION
/////////////////////////////////////////

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export type JsonValueType = string | number | boolean | null | { [key: string]: JsonValueType | undefined } | JsonValueType[];
export type NullableJsonValueType = JsonValueType | 'DbNull' | 'JsonNull' | null;
export type InputJsonValueType = string | number | boolean | { toJSON: () => unknown } | { [key: string]: InputJsonValueType | null } | (InputJsonValueType | null)[];

/////////////////////////////////////////
// DECIMAL SECTION
/////////////////////////////////////////

export interface DecimalJsLike { d: number[]; e: number; s: number; toFixed(): string; }
export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput = (v?: null | string | number | DecimalJsLike): v is string | number | DecimalJsLike => {
  if (v == null) return false;
  return (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) || (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) || typeof v === 'number';
};
`;

  if (multiFiles) {
      writeContentToFile(path.join(outDir, 'helper', 'helper-types.ts'), helperTypesContent);
  } else {
      writeContentToFile(path.join(outDir, 'helper-types.ts'), helperTypesContent);
  }


  let indexContent = '';
  if (needsHelperTypes && !multiFiles) {
      indexContent += `import type { DecimalJsLike, JsonValueType } from './helper-types';\n\n`;
  }

  allEnums.forEach(enumDef => {
      indexContent += genEnum(enumDef, outDir, multiFiles);
  });
  [...allTypes, ...allModels].forEach(model => {
      indexContent += genModel(model, allModels, allEnums, allTypes, outDir, multiFiles, needsHelperTypes);
  });


  if (!multiFiles) {
      writeContentToFile(path.join(outDir, 'index.ts'), indexContent);
  }
};
