// import { getSchema } from '@mrleebo/prisma-ast';
// import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, promises as fsPromises, existsSync } from 'fs';
// import path from 'path';

// export interface FieldDef {
//     name: string;
//     type: string;
//     isArray: boolean;
//     isOptional: boolean;
//     comment?: string;
// }

// export interface ModelDef {
//     name: string;
//     fields: FieldDef[];
//     isType: boolean;
//     comments: string[];
// }

// interface EnumDef {
//     name: string;
//     values: string[];
// }

// interface GeneratorConfig {
//     dirOrFilesPath: string[];
//     outputPath: string;
//     multiFiles: boolean;
//     modelVariants?: string[];
// }

// const processObject = (node: any, isType: boolean): ModelDef => ({
//     name: node.name,
//     isType,
//     comments: node.comments?.map((c: any) => c.text) || [],
//     fields: (node.properties || [])
//         .filter((p: any) => p.type === 'field')
//         .map((p: any) => ({
//             name: p.name,
//             type: typeof p.fieldType === 'string' ? p.fieldType : p.fieldType.name,
//             isArray: p.array ?? false,
//             isOptional: p.optional || (p.attributes || []).some((attr: any) => attr.name === 'nullable'),
//             comment: p.comment,
//         })),
// });

// const processEnum = (node: any): EnumDef => ({
//     name: node.name,
//     values: node.enumerators
//         .filter((e: any) => e.type === 'enumerator')
//         .map((e: any) => e.name),
// });

// const writeContentToFile = (filePath: string, content: string) => {
//     writeFileSync(filePath, content.trim() + '\n');
// }

// const genEnum = (
//     enumDef: EnumDef,
//     outDir: string,
//     multiFiles: boolean,
//     resolvedEnumDirPath: string | null
// ): string => {
//     const content = `export type ${enumDef.name} = ${enumDef.values.map(v => `'${v}'`).join(' | ')};\n`;
//     if (multiFiles) {
//         const enumOutputDir = resolvedEnumDirPath || path.join(outDir, 'enum');
//         const enumFilePath = path.join(enumOutputDir, `${enumDef.name}.ts`);
//         writeContentToFile(enumFilePath, content);
//         return '';
//     }
//     return content;
// };

// const typeMap: Record<string, string> = {
//     String: 'string',
//     Decimal: 'DecimalJsLike',
//     Int: 'number',
//     Float: 'number',
//     Boolean: 'boolean',
//     DateTime: 'Date',
//     Json: 'JsonValueType',
//     Bytes: 'Buffer',
//     BigInt: 'bigint',
// };

// const getTsType = (
//     type: string,
//     field: FieldDef,
//     currModel: ModelDef,
//     allModels: ModelDef[],
//     enums: EnumDef[],
//     types: ModelDef[],
//     imports: Set<string>,
//     multiFiles: boolean
// ): string => {
//     const cleanType = type.replace('[]', '');
//     if (typeMap[cleanType]) return typeMap[cleanType];
//     if (enums.some(e => e.name === cleanType)) {
//         if (multiFiles) imports.add(`enum/${cleanType}`);
//         return cleanType;
//     }
//     if (allModels.some(m => m.name === cleanType && !m.isType) || types.some(t => t.name === cleanType)) {
//         if (multiFiles && cleanType.trim().toLowerCase() !== currModel.name.trim().toLowerCase()) imports.add(`model/${cleanType}`);
//         return cleanType;
//     }
//     return 'string';
// };


// const genModel = (
//     model: ModelDef,
//     allModels: ModelDef[],
//     enums: EnumDef[],
//     types: ModelDef[],
//     outDir: string,
//     multiFiles: boolean,
//     needsHelperTypes: boolean,
//     variant: string,
//     modelVariants: string[] | undefined,
//     resolvedModelDirPath: string | null,
//     resolvedEnumDirPath: string | null,
//     resolvedHelperDirPath: string | null
// ): string => {
//     const imports = new Set<string>();
//     let content = model.comments?.map(c => `/// ${c}\n`).join('') || '';
//     let fieldsContent = '';

//     const autoGeneratedFields = ['id', 'createdAt', 'updatedAt'];
//     const modelOutputDir = resolvedModelDirPath || path.join(outDir, 'model');
//     const enumOutputDir = resolvedEnumDirPath || path.join(outDir, 'enum');
//     const helperOutputDir = resolvedHelperDirPath || path.join(outDir, 'helper');
//     const modelFilePath = path.join(modelOutputDir, `${model.name}.ts`);


//     if (variant === 'CreateInput') {
//         fieldsContent = model.fields
//             .filter(field => !autoGeneratedFields.includes(field.name))
//             .map(field => {
//                 let tsType = getTsType(field.type, field, model, allModels, enums, types, imports, multiFiles);
//                 if (field.isArray) tsType += '[]';
//                 const commentLine = field.comment ? `  ${field.comment}\n` : '';
//                 return `${commentLine}  ${field.name}${field.isOptional ? '?' : ''}: ${tsType};`;
//             }).join('\n');
//     } else if (variant === 'UpdateInput') {
//         fieldsContent = model.fields.map(field => {
//             let tsType = getTsType(field.type, field, model, allModels, enums, types, imports, multiFiles);
//             if (field.isArray) tsType += '[]';
//             const commentLine = field.comment ? `  ${field.comment}\n` : '';
//             return `${commentLine}  ${field.name}?: ${tsType} | null;`;
//         }).join('\n');
//     }
//     else {
//         fieldsContent = model.fields.map(field => {
//             let tsType = getTsType(field.type, field, model, allModels, enums, types, imports, multiFiles);
//             if (field.isArray) tsType += '[]';
//             if (field.isOptional && variant !== 'Partial') tsType += ' | null';
//             const commentLine = field.comment ? `  ${field.comment}\n` : '';
//             return `${commentLine}  ${field.name}${variant === 'Partial' ? '?' : ''}: ${tsType};`;
//         }).join('\n');
//     }


//     let importStatements = '';
//     let helperImports = '';
//     const needsDecimal = model.fields.some(f => f.type === 'Decimal');
//     const needsJson = model.fields.some(f => f.type === 'Json');


//     if (multiFiles) {
//         const importStatementsArray = Array.from(imports).map(originalImportPath => {
//             let targetDirPath;
//             let processedImportPath = originalImportPath;

//             if (originalImportPath.startsWith('enum/')) {
//                 targetDirPath = enumOutputDir;
//                 processedImportPath = originalImportPath.replace('enum/', '');
//             } else if (originalImportPath.startsWith('model/')) {
//                 targetDirPath = modelOutputDir;
//                 processedImportPath = originalImportPath.replace('model/', '');
//             } else {
//                 targetDirPath = helperOutputDir; // Corrected: Assuming helper import
//                 processedImportPath = originalImportPath.replace('helper/', ''); // Corrected: Assuming helper import
//             }

//             const targetFilePath = path.join(targetDirPath, `${path.basename(processedImportPath)}.ts`);

//             // Calculate relative path
//             const relativePath = path.relative(path.dirname(modelFilePath), targetFilePath).replace(/\\/g, '/');

//             return `import type { ${path.basename(processedImportPath)} } from '${relativePath.startsWith('.') ? relativePath : './' + relativePath}';`;
//         });


//         if (variant !== 'Partial' && variant !== 'CreateInput' && variant !== 'UpdateInput') {
//             const helperTypesFilePath = path.join(helperOutputDir, 'helper-types.ts');
//             const relativeHelperPath = path.relative(path.dirname(modelFilePath), helperTypesFilePath).replace(/\\/g, '/');

//             helperImports = [
//                 needsDecimal ? `import type { DecimalJsLike } from '${relativeHelperPath.startsWith('.') ? relativeHelperPath : './' + relativeHelperPath}';` : '',
//                 needsJson ? `import type { JsonValueType } from '${relativeHelperPath.startsWith('.') ? relativeHelperPath : './' + relativeHelperPath}';` : '',
//             ].filter(Boolean).join('\n');
//             importStatements = `${helperImports}\n${importStatementsArray.join('\n')}`;

//         } else {
//             const helperTypesFilePath = path.join(helperOutputDir, 'helper-types.ts');
//             const relativeHelperPath = path.relative(path.dirname(modelFilePath), helperTypesFilePath).replace(/\\/g, '/');

//             helperImports = [
//                 needsDecimal ? `import type { DecimalJsLike } from '${relativeHelperPath.startsWith('.') ? relativeHelperPath : './' + relativeHelperPath}';` : '',
//                 needsJson ? `import type { JsonValueType } from '${relativeHelperPath.startsWith('.') ? relativeHelperPath : './' + relativeHelperPath}';` : '',
//             ].filter(Boolean).join('\n');
//             importStatements = `${helperImports}\n${importStatementsArray.join('\n')}`;

//         }

//     }


//     let modelContent = '';
//     const variantName = variant === 'Regular' ? model.name : `${model.name}${variant}`;
//     if (variant === 'Partial' || variant === 'CreateInput' || variant === 'UpdateInput') {
//         const baseTypeName = model.name;
//         const typeAliasContent = `export type ${variantName} = ${variant === 'Partial' ? `Partial<${baseTypeName}>` : variant === 'CreateInput' ?  `Omit<${baseTypeName}, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<${baseTypeName}, ${model.fields.filter(f => !f.isOptional && !autoGeneratedFields.includes(f.name)).map(f => `'${f.name}'`).join(' | ')}>>` : `Partial<${baseTypeName}>` };\n`;
//         modelContent = typeAliasContent;
//     }
//     else {
//         const regularInterfaceContent = `export interface ${variantName} ${fieldsContent ? `{\n${fieldsContent}\n}` : `{}`}\n`;
//         modelContent = regularInterfaceContent;
//     }

//     if (multiFiles) {
//         const regularVariantName = model.name;
//         let fileContentToWrite = '';
//         if (modelVariants && modelVariants.includes('Regular')) {
//             const regularInterfaceContent = `${importStatements.trim()}\n${content}export interface ${model.name} ${fieldsContent ? `{\n${fieldsContent}\n}` : `{}`}\n`;
//             fileContentToWrite += regularInterfaceContent + '\n';
//         }
//         if (modelVariants && modelVariants.includes('Partial')) {
//             const partialTypeContent = `export type ${model.name}Partial = Partial<${model.name}>;\n`;
//             fileContentToWrite += partialTypeContent + '\n';
//         }
//          if (modelVariants && modelVariants.includes('CreateInput')) {
//             const createInputTypeContent = `export type ${model.name}CreateInput = Omit<${model.name}, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<${model.name}, ${model.fields.filter(f => !f.isOptional && !autoGeneratedFields.includes(f.name)).map(f => `'${f.name}'`).join(' | ')}>>;\n`;
//             fileContentToWrite += createInputTypeContent + '\n';
//         }
//         if (modelVariants && modelVariants.includes('UpdateInput')) {
//              const updateInputType = `export type ${model.name}UpdateInput = Partial<${model.name}>;\n`;
//              fileContentToWrite += updateInputType + '\n';
//         }
//         const modelWritePath = path.join(modelOutputDir, `${regularVariantName}.ts`);
//         writeContentToFile(modelWritePath, fileContentToWrite);
//         return '';
//     }
//     return modelContent;
// };


// const getAllPrismaFiles = (dirPath: string): string[] => {
//     const files = readdirSync(dirPath);
//     return files.reduce<string[]>((prismaFiles, file) => {
//         const filePath = path.join(dirPath, file);
//         if (statSync(filePath).isDirectory()) {
//             return prismaFiles.concat(getAllPrismaFiles(filePath));
//         }
//         if (file.endsWith('.prisma')) {
//             return [...prismaFiles, filePath];
//         }
//         return prismaFiles;
//     }, []);
// };

// const findDirectoryByName = async (baseDir: string, dirName: string): Promise<string | null> => {
//     try {
//         const entries = await fsPromises.readdir(baseDir);
//         for (const entry of entries) {
//             const fullEntryPath = path.join(baseDir, entry);
//             const stat = await fsPromises.stat(fullEntryPath);
//             if (stat.isDirectory() && entry === dirName) {
//                 return fullEntryPath;
//             }
//         }
//         return null;
//     } catch (error) {
//         console.error(`Error searching for directory '${dirName}' in '${baseDir}': ${error}`);
//         return null;
//     }
// };

// const findModelDir = (outputPath: string): Promise<string | null> => findDirectoryByName(outputPath, 'model');
// const findEnumDir = (outputPath: string): Promise<string | null> => findDirectoryByName(outputPath, 'enum');
// const findHelperDir = (outputPath: string | null): Promise<string | null> => outputPath ? findDirectoryByName(outputPath, 'helper') : Promise.resolve(null);


// export const generate = async (config: GeneratorConfig) => {
//     const { dirOrFilesPath, outputPath, multiFiles, modelVariants } = config;
//     const allModels: ModelDef[] = [];
//     const allEnums: EnumDef[] = [];
//     const allTypes: ModelDef[] = [];
//     const resolvedSchemaPaths: string[] = [];
//     let needsHelperTypes = false;

//     const outDir = path.join(process.cwd(), outputPath);
//     const resolvedModelDirPath = path.join(outDir, 'model');
//     const resolvedEnumDirPath = path.join(outDir, 'enum');
//     const resolvedHelperDirPath = path.join(outDir, 'helper');


//     dirOrFilesPath.forEach(schemaPath => {
//         const stat = statSync(schemaPath);
//         if (stat.isDirectory()) {
//             resolvedSchemaPaths.push(...getAllPrismaFiles(schemaPath));
//         } else {
//             resolvedSchemaPaths.push(schemaPath);
//         }
//     });

//     resolvedSchemaPaths.forEach(prismaSchemaPath => {
//         const schema = getSchema(readFileSync(prismaSchemaPath, 'utf-8'));
//         schema.list.forEach((node) => {
//             switch (node.type) {
//                 case 'model':
//                     const model = processObject(node, false);
//                     allModels.push(model);
//                     if (model.fields.some(f => f.type === 'Decimal' || f.type === 'Json')) {
//                         needsHelperTypes = true;
//                     }
//                     break;
//                 case 'enum': allEnums.push(processEnum(node)); break;
//                 case 'type':
//                     const type = processObject(node, true);
//                     allTypes.push(type);
//                     if (type.fields.some(f => f.type === 'Decimal' || f.type === 'Json')) {
//                         needsHelperTypes = true;
//                     }
//                     break;
//             }
//         });
//     });


//     if (multiFiles) {
//         if (!existsSync(resolvedModelDirPath)) console.warn("Warning: 'model' directory will be created at default location.");
//         if (!existsSync(resolvedEnumDirPath)) console.warn("Warning: 'enum' directory will be created at default location.");
//         if (!existsSync(resolvedHelperDirPath)) console.warn("Warning: 'helper' directory will be created at default location.");

//         mkdirSync(resolvedModelDirPath, { recursive: true });
//         mkdirSync(resolvedHelperDirPath, { recursive: true });
//         mkdirSync(resolvedEnumDirPath, { recursive: true });

//     } else {
//         mkdirSync(outDir, { recursive: true });
//     }

//     const helperTypesContent = `
// import { Prisma } from '@prisma/client';

// /////////////////////////////////////////
// // JSON SECTION
// /////////////////////////////////////////

// export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

// export const transformJsonNull = (v?: NullableJsonInput) => {
//     if (!v || v === 'DbNull') return Prisma.DbNull;
//     if (v === 'JsonNull') return Prisma.JsonNull;
//     return v;
// };

// export type JsonValueType = string | number | boolean | null | { [key: string]: JsonValueType | undefined } | JsonValueType[];
// export type NullableJsonValueType = JsonValueType | 'DbNull' | 'JsonNull' | null;
// export type InputJsonValueType = string | number | boolean | { toJSON: () => unknown } | { [key: string]: InputJsonValueType | null } | (InputJsonValueType | null)[];

// /////////////////////////////////////////
// // DECIMAL SECTION
// /////////////////////////////////////////

// export interface DecimalJsLike { d: number[]; e: number; s: number; toFixed(): string; }
// export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:.[01]+)?(?:[pP][-+]?\\d+)?|0[oO][0-7]+(?:.[0-7]+)?(?:[pP][-+]?\\d+)?|0[xX][\\da-fA-F]+(?:.[\\da-fA-F]+)?(?:[pP][-+]?\\d+)?|(?:\\d+|\\d*\\.\\d+)(?:[eE][-+]?\\d+)?))$/;

// export const isValidDecimalInput = (v?: null | string | number | DecimalJsLike): v is string | number | DecimalJsLike => {
//     if (v == null) return false;
//     return (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) || (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) || typeof v === 'number';
// };
// `;

//     if (multiFiles) {
//         writeFileSync(path.join(resolvedHelperDirPath, 'helper-types.ts'), helperTypesContent);
//     } else {
//         writeFileSync(path.join(outDir, 'helper-types.ts'), helperTypesContent);
//     }


//     let indexContent = '';
//     if (needsHelperTypes && !multiFiles) {
//         indexContent += `import type { DecimalJsLike, JsonValueType } from './helper-types';\n\n`;
//     }

//     allEnums.forEach((enumDef) => {
//         indexContent += genEnum(enumDef, outDir, multiFiles, resolvedEnumDirPath);
//     });

//     [...allTypes, ...allModels].forEach(model => { // Corrected loop structure
//         const variantsToGenerate = modelVariants || ['Regular'];
//         variantsToGenerate.forEach(variant => {
//             indexContent += genModel(model, allModels, allEnums, allTypes, outDir, multiFiles, needsHelperTypes, variant, modelVariants, resolvedModelDirPath, resolvedEnumDirPath, resolvedHelperDirPath);
//         });
//     });


//     if (!multiFiles) {
//         writeFileSync(path.join(outDir, 'index.ts'), indexContent);
//     }
// };
