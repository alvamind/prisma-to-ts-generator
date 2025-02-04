import { generate } from "./generator";

generate({
  dirOrFilesPath: ['prisma/schema'], // or ['./prisma'] directory
  outputPath: 'output/ts',
  multiFiles: false // or false for single index.ts
});
