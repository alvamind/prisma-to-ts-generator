import { getSchema } from '@mrleebo/prisma-ast';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
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

function processObject(node: any, isType: boolean): ModelDef {
  const props = node.properties || [];
  return {
    name: node.name,
    isType,
    comments: props.filter((p: any) => p.type === 'comment').map((c: any) => c.text),
    fields: props
      .filter((p: any) => p.type === 'field')
      .map((p: any) => ({
        name: p.name,
        type: typeof p.fieldType === 'string' ? p.fieldType : p.fieldType.name,
        isArray: p.array || false,
        isOptional: p.optional || false,
        comment: p.comment,
      })),
  };
}

function processEnum(node: any): EnumDef {
  return {
    name: node.name,
    values: node.enumerators.filter((e: any) => e.type === 'enumerator').map((e: any) => e.name),
  };
}


function genEnum(enumDef: EnumDef, outDir: string) {
  const content = `export type ${enumDef.name} = ${enumDef.values.map(v => `'${v}'`).join(' | ')};\n`;
  writeFileSync(path.join(outDir, `${enumDef.name}.ts`), content);
}

function genModel(
  model: ModelDef,
  allModels: ModelDef[],
  enums: EnumDef[],
  types: ModelDef[],
  outDir: string
) {
  const imports = new Set<string>();
  let content = '';
  if (model.comments && model.comments.length) {
    content += model.comments.map(c => `${c}\n`).join('');
  }

  let fields = "";
  model.fields.forEach((field) => {
    let tsType = getTsType(field.type, field, model, allModels, enums, types, imports);
    if (field.isArray) tsType = `${tsType}[]`;
    if (field.isOptional) tsType += ' | null';
    fields += `${field.comment ? `  ${field.comment}\n` : ''}  ${field.name}: ${tsType};\n`;
  });
  imports.forEach(i => content += `import type { ${i} } from './${i}';\n`)
  const interfaceContent = fields ? `{\n${fields.trimEnd()}\n}` : `{}`;
  content += `export interface ${model.name} ${interfaceContent}\n`

  writeFileSync(path.join(outDir, `${model.name}.ts`), content);
}

function getTsType(
  type: string,
  field: FieldDef,
  currModel: ModelDef,
  allModels: ModelDef[],
  enums: EnumDef[],
  types: ModelDef[],
  imports: Set<string>
): string {
  const cleanType = type.replace('[]', '');
  const isEnum = enums.some(e => e.name === cleanType);
  const isModel = allModels.some(m => m.name === cleanType && !m.isType);
  const isType = types.some(t => t.name === cleanType);
  let tsType: string;

  switch (cleanType) {
    case 'String':
    case 'Decimal':
      tsType = 'string'; break;
    case 'Int':
    case 'Float':
      tsType = 'number'; break;
    case 'Boolean': tsType = 'boolean'; break;
    case 'DateTime': tsType = 'Date'; break;
    case 'Json': tsType = 'any'; break;
    case 'Bytes': tsType = 'Buffer'; break;
    case 'BigInt': tsType = 'bigint'; break;
    default:
      if (isEnum) {
        tsType = cleanType;
      } else if (isModel || isType) {
        if (cleanType !== currModel.name) {
          imports.add(cleanType);
        }
        tsType = cleanType;
      } else {
        tsType = 'string'; // Default
      }
      break;
  }
  return tsType;
}


export function generate(prismaSchemaPaths: string[]) {
  const allModels: ModelDef[] = [];
  const allEnums: EnumDef[] = [];
  const allTypes: ModelDef[] = [];

  prismaSchemaPaths.forEach(prismaSchemaPath => {
    const schemaContent = readFileSync(prismaSchemaPath, 'utf-8');
    const schema = getSchema(schemaContent);

    schema.list.forEach((node) => {
      switch (node.type) {
        case 'model': allModels.push(processObject(node, false)); break;
        case 'enum': allEnums.push(processEnum(node)); break;
        case 'type': allTypes.push(processObject(node, true)); break;
      }
    });
  })

  const outDir = path.join(process.cwd(), 'output');
  mkdirSync(outDir, { recursive: true });

  allEnums.forEach((enumDef) => genEnum(enumDef, outDir));
  [...allTypes, ...allModels].forEach(model => genModel(model, allModels, allEnums, allTypes, outDir))
}
