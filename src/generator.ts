import { getSchema } from '@mrleebo/prisma-ast';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import path from 'path';

type FieldDef = {
  name: string;
  type: string;
  isArray: boolean;
  isOptional: boolean;
  comment?: string;
};

type ModelDef = {
  name: string;
  fields: FieldDef[];
  isType: boolean;
  comments: string[];
};

type EnumDef = {
  name: string;
  values: string[];
};

const processObject = (node: any, isType: boolean): ModelDef => ({
  name: node.name,
  isType,
  comments: (node.comments || []).map((c: any) => c.text),
  fields: (node.properties || [])
    .filter((p: any) => p.type === 'field')
    .map((p: any) => {
      const isNullableAttribute = (p.attributes || []).some((attr: any) => attr.name === 'nullable');
      return {
        name: p.name,
        type: typeof p.fieldType === 'string' ? p.fieldType : p.fieldType.name,
        isArray: p.array || false,
        isOptional: p.optional || isNullableAttribute,
        comment: p.comment,
      };
    }),
});

const processEnum = (node: any): EnumDef => ({
  name: node.name,
  values: node.enumerators
    .filter((e: any) => e.type === 'enumerator')
    .map((e: any) => e.name),
});

const genEnum = (enumDef: EnumDef, outDir: string) => {
  const content = `export type ${enumDef.name} = ${enumDef.values.map(v => `'${v}'`).join(' | ')};\n`;
  writeFileSync(path.join(outDir, `${enumDef.name}.ts`), content);
};

const genModel = (
  model: ModelDef,
  allModels: ModelDef[],
  enums: EnumDef[],
  types: ModelDef[],
  outDir: string
) => {
  const imports = new Set<string>();
  let content = model.comments?.map(c => `/// ${c}\n`).join('') || '';

  const fieldsContent = model.fields.map(field => {
    let tsType = getTsType(field.type, field, model, allModels, enums, types, imports);
    if (field.isArray) tsType = `${tsType}[]`;
    if (field.isOptional) tsType += ' | null';
    return `${field.comment ? `  ${field.comment}\n` : ''}  ${field.name}: ${tsType};`;
  }).join('\n');

  const importStatements = Array.from(imports).map(i => `import type { ${i} } from './${i}';`).join('\n');
  content = `${importStatements}\n${content}export interface ${model.name} ${fieldsContent ? `{\n${fieldsContent}\n}` : `{}`}\n`;

  writeFileSync(path.join(outDir, `${model.name}.ts`), content.trim().trimEnd());
};


const typeMap: Record<string, string> = {
  String: 'string',
  Decimal: 'string',
  Int: 'number',
  Float: 'number',
  Boolean: 'boolean',
  DateTime: 'Date',
  Json: 'any',
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
  imports: Set<string>
): string => {
  const cleanType = type.replace('[]', '');
  if (typeMap[cleanType]) return typeMap[cleanType];
  if (enums.some(e => e.name === cleanType) || allModels.some(m => m.name === cleanType && !m.isType) || types.some(t => t.name === cleanType)) {
    if (cleanType !== currModel.name) imports.add(cleanType);
    return cleanType;
  }
  return 'string'; // Default
};


const getAllPrismaFiles = (dirPath: string): string[] => {
  let prismaFiles: string[] = [];
  const files = readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const fileStat = statSync(filePath);

    if (fileStat.isDirectory()) {
      prismaFiles = prismaFiles.concat(getAllPrismaFiles(filePath)); // Recursive call for subdirectories
    } else if (file.endsWith('.prisma')) {
      prismaFiles.push(filePath);
    }
  }
  return prismaFiles;
};


export const generate = (prismaSchemaPaths: string[]) => {
  const allModels: ModelDef[] = [];
  const allEnums: EnumDef[] = [];
  const allTypes: ModelDef[] = [];
  const resolvedSchemaPaths: string[] = [];


  prismaSchemaPaths.forEach(schemaPath => {
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
        case 'model': allModels.push(processObject(node, false)); break;
        case 'enum': allEnums.push(processEnum(node)); break;
        case 'type': allTypes.push(processObject(node, true)); break;
      }
    });
  });

  const outDir = path.join(process.cwd(), 'output');
  mkdirSync(outDir, { recursive: true });

  allEnums.forEach((enumDef) => genEnum(enumDef, outDir));
  [...allTypes, ...allModels].forEach(model => genModel(model, allModels, allEnums, allTypes, outDir));
};
