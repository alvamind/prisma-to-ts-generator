import { generate } from "./generator";

generate({
  dirOrFilesPath: ['prisma/schema'],
  outputPath: 'output/ts',
  multiFiles: true,
  modelVariants: [
    'Regular',
    'Partial'
  ],
});
