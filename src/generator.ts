import { getSchema } from '@mrleebo/prisma-ast';
import path from 'path';
import { GeneratorConfig, ModelDef, EnumDef, VariantType } from './types';
import { processModel, processEnum } from './ast-processor';
import { generateEnum, generateModel } from './ts-generator';
import { readFile, findFilesByExtension, ensureDirExists, resolveDirPath, resolveOutputPath, writeFile, isDirectory } from './file-utils';
import { needsHelperTypes } from './type-mapping';

export const generate = async (config: GeneratorConfig) => {
    const { dirOrFilesPath, outputPath, multiFiles, modelVariants } = config;
    const allModels: ModelDef[] = [];
    const allEnums: EnumDef[] = [];
    const allTypes: ModelDef[] = [];
    const resolvedSchemaPaths: string[] = [];
    let hasHelperTypes = false;

    const outDir = resolveOutputPath(outputPath);
    const resolvedModelDirPath = path.join(outDir, 'model'); // Use resolved outDir
    const resolvedEnumDirPath = path.join(outDir, 'enum'); // Use resolved outDir
    const resolvedHelperDirPath = path.join(outDir, 'helper'); // Use resolved outDir

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
        if (hasHelperTypes) writeFile(path.join(resolvedHelperDirPath, 'helper-types.ts'), readFile(path.join(__dirname, 'helper-types.ts')));
    } else {
        ensureDirExists(outDir);
        if (hasHelperTypes) writeFile(path.join(outDir, 'helper-types.ts'), readFile(path.join(__dirname, 'helper-types.ts')));
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
