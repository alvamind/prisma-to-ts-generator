import { generate } from "./generator";

generate({
  dirOrFilesPath: ['prisma/schema'],
  outputPath: 'output/ts',
  multiFiles: true,
  modelVariants: [
    'Regular',
    'Optional',
    'WithRelations',
    'OptionalRelations',
    'PartialRelations',
    'OptionalFullRelations',
  ], // Generate all variants
});
