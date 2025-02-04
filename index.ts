import { generate } from "./src";


async function main() {
  await generate({
    dirOrFilesPath: ['./prisma'], // Path to your prisma schema directory or files
    outputPath: './generated',   // Output directory for generated types
    multiFiles: true,            // Generate separate files for each model/enum
    modelVariants: ['Regular', 'Partial', 'CreateInput', 'UpdateInput'], // Specify model variants to generate
  });
}

main().catch(e => console.error(e));
