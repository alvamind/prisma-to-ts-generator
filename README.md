# prisma-to-ts-generator by Alvamind

[![NPM Version](https://img.shields.io/npm/v/prisma-to-ts-generator)](https://www.npmjs.com/package/prisma-to-ts-generator)
[![License](https://img.shields.io/npm/l/prisma-to-ts-generator)](https://github.com/your-github-username/prisma-to-ts-generator/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/your-github-username/prisma-to-ts-generator/main.yml?branch=main)](https://github.com/your-github-username/prisma-to-ts-generator/actions)

**Effortlessly generate TypeScript types from your Prisma schema.**

`prisma-to-ts-generator` is a zero-dependency (except for Prisma ecosystem libraries) utility designed to streamline your TypeScript development with Prisma. It automatically generates TypeScript interfaces and types directly from your Prisma schema (`.prisma`) files, ensuring type safety and enhancing developer experience. Forget about manually creating and maintaining TypeScript type definitions – let `prisma-to-ts-generator` handle it for you!

## Features

*   **Automatic Type Generation:**  Generates TypeScript interfaces and types for your Prisma models, enums, and types.
*   **Multiple Output Options:**  Supports generating types into a single `index.ts` file or splitting them into multiple files (one per model and enum).
*   **Model Variants:**  Offers generation of various model variants like `Regular` (base type), `CreateInput`, `UpdateInput`, and `Partial` to align with common Prisma use cases.
*   **Handles Relations & Custom Types:**  Correctly interprets Prisma schema relationships and maps Prisma scalar types to appropriate TypeScript types (including `Decimal`, `Json`, `DateTime`, etc.).
*   **Comment Preservation:**  Transfers comments from your Prisma schema to the generated TypeScript types for better documentation.
*   **No CLI Required:**  Designed for programmatic use, making it easy to integrate into your build processes or scripts.
*   **Lightweight & Fast:**  Minimal dependencies and optimized processing for efficient type generation.

## How it Works

`prisma-to-ts-generator` operates in the following steps:

1.  **Schema Parsing:**  It utilizes `@mrleebo/prisma-ast` to parse your Prisma schema file(s) into an Abstract Syntax Tree (AST). This AST represents the structure of your schema in a programmatically accessible way.
2.  **AST Processing:**  The AST is then traversed to identify models, enums, and types. For each entity, relevant information such as names, fields, types, attributes, and comments are extracted.
3.  **Type Mapping:**  Prisma scalar types (e.g., `String`, `Int`, `DateTime`) are mapped to their corresponding TypeScript equivalents (e.g., `string`, `number`, `Date`).  Custom types, enums, and model relations are resolved and referenced correctly in the generated TypeScript code. Helper types like `DecimalJsLike` and `JsonValueType` are used for specific Prisma types.
4.  **Code Generation:**  Based on the processed information and configuration options (like `multiFiles` and `modelVariants`), TypeScript code is generated. This includes:
    *   `enum` types for Prisma enums.
    *   `interface` definitions for Prisma models and types, with fields correctly typed and optionality reflected from the schema.
    *   Variant types (e.g., `CreateInput`, `UpdateInput`, `Partial`) are generated using TypeScript utility types like `Omit`, `Partial`, and `Required` for Prisma model input scenarios.
5.  **File Writing:**  Finally, the generated TypeScript code is written to the specified output directory, either as a single `index.ts` file or as separate files based on the `multiFiles` setting.

## Dependencies

*   **`@mrleebo/prisma-ast`**:  Used for parsing Prisma schema files.
    *   *Purpose:*  Parses the `.prisma` schema into an AST, allowing programmatic analysis of the schema structure.
*   **`@prisma/client`**:  Used for type references, specifically `Prisma.JsonValue` and `Prisma.NullTypes`.
    *   *Purpose:* Provides necessary types for handling Prisma's `Json` scalar and null value representations.
*   **`typescript`**:  (Dev Dependency) Required for building the library itself. You likely already have this in your development environment if you are working with TypeScript.
    *   *Purpose:*  Used to compile the TypeScript code of `prisma-to-ts-generator` into JavaScript.

**Peer Dependencies:**

While not strictly listed as peer dependencies in `package.json` for simplicity in basic usage, it's implicitly expected that you have:

*   **Prisma CLI and Prisma Schema:**  You need to have Prisma set up in your project with a valid `schema.prisma` file, as this is the input for `prisma-to-ts-generator`.

## Installation

```bash
npm install prisma-to-ts-generator
```

or

```bash
yarn add prisma-to-ts-generator
```

## Usage

```typescript
import { generate } from 'prisma-to-ts-generator';
import path from 'path';

async function main() {
  try {
    await generate({
      dirOrFilesPath: [path.join(__dirname, '../prisma/schema.prisma')], // Path to your Prisma schema file(s) or directory
      outputPath: path.join(__dirname, '../src/generated'),           // Output directory for generated TypeScript files
      multiFiles: true,                                              // Generate separate files for each model and enum (true/false)
      modelVariants: ['Regular', 'CreateInput', 'UpdateInput', 'Partial'], // Optional: Specify model variants to generate (array of VariantType)
    });
    console.log('TypeScript types generated successfully to ./src/generated!');
  } catch (error) {
    console.error('Type generation failed:', error);
  }
}

main();
```

**Explanation:**

1.  **Import `generate`:** Import the `generate` function from the `prisma-to-ts-generator` library.
2.  **Define Configuration:** Create a `GeneratorConfig` object to configure the type generation process.
    *   `dirOrFilesPath`:  An array of strings, specifying the paths to your Prisma schema files or directories containing them. You can provide multiple paths. Relative paths are resolved from your project's root directory (where you run the script).
    *   `outputPath`:  The path to the directory where you want the generated TypeScript files to be placed. Relative paths are resolved from your project's root directory.
    *   `multiFiles`:  A boolean value.
        *   `true`:  Generates separate TypeScript files for each model and enum within the `outputPath`. Models will be placed in a `model` subdirectory, and enums in an `enum` subdirectory. An `index.ts` file will be created in the `outputPath` to re-export all generated types.
        *   `false`: Generates all TypeScript types into a single `index.ts` file within the `outputPath`.
    *   `modelVariants` (Optional): An array of `VariantType` strings. This allows you to specify which model variants should be generated. If not provided, it defaults to generating only the `Regular` variant.
3.  **Call `generate()`:** Call the `generate()` function with your configuration object. This function is asynchronous and returns a `Promise`.
4.  **Handle Results:** Use `.then()` and `.catch()` (or `async/await` with `try/catch`) to handle the success or failure of the type generation process.

**Run the script:**

Execute this TypeScript script using `ts-node`, `node` (after compiling to JavaScript), or integrate it into your build process.

## Configuration Options

The `generate` function accepts a single configuration object of type `GeneratorConfig`:

```typescript
interface GeneratorConfig {
  dirOrFilesPath: string[];
  outputPath: string;
  multiFiles: boolean;
  modelVariants?: VariantType[];
}
```

*   **`dirOrFilesPath: string[]`**:
    *   **Description:**  An array of paths to your Prisma schema files or directories containing `.prisma` files.
    *   **Details:**  You can provide multiple paths to process schemas from different locations. If a path points to a directory, the generator will recursively search for `.prisma` files within that directory and its subdirectories. Paths can be absolute or relative to your project's root.

*   **`outputPath: string`**:
    *   **Description:**  The path to the directory where the generated TypeScript files will be written.
    *   **Details:**  The directory will be created if it doesn't exist. Relative paths are resolved from your project's root.

*   **`multiFiles: boolean`**:
    *   **Description:**  Determines whether to generate separate files or a single `index.ts`.
    *   **`true`**:  Organizes generated types into separate files within subdirectories (`model/`, `enum/`) inside `outputPath`. Creates an `index.ts` to re-export everything.  This is recommended for larger schemas and better code organization.
    *   **`false`**:  Combines all generated types into a single `index.ts` file in the `outputPath`. Suitable for smaller schemas or when you prefer a single output file.

*   **`modelVariants?: VariantType[]`**:
    *   **Description:**  An optional array to specify which model variants to generate.
    *   **Details:**  If not provided, only the `Regular` model type will be generated. You can choose from the following `VariantType` options:

## Model Variants (`VariantType`)

`prisma-to-ts-generator` supports generating different variants of your Prisma models to cater to common use cases, especially when working with input types for Prisma Client.

The available `VariantType` options are:

*   **`'Regular'`**:  Generates the base interface for your model, directly reflecting the fields and types defined in your Prisma schema. This is the default type and represents the standard model structure.

    ```typescript
    export interface UserModel {
      id: number;
      email: string;
      name?: string | null;
      posts: PostModel[]; // Assuming a relation
      createdAt: Date;
      updatedAt: Date;
    }
    ```

*   **`'CreateInput'`**:  Generates a type suitable for creating new records of the model using Prisma Client's `create` operations. It typically omits auto-generated fields like `id`, `createdAt`, and `updatedAt` and makes fields that are non-nullable in Prisma required in the TypeScript type.

    ```typescript
    export type UserCreateInput = Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<UserModel, 'email'>>;
    ```

*   **`'UpdateInput'`**:  Generates a type for updating existing records using Prisma Client's `update` operations. All fields in this type are typically made optional (or partial) to allow updating only specific fields.

    ```typescript
    export type UserUpdateInput = Partial<UserModel>;
    ```

*   **`'Partial'`**:  Generates a partial type of the model, making all fields optional. This is useful for scenarios where you need a flexible type representing a subset of model fields, for example, in data transfer objects (DTOs) or when dealing with potentially incomplete data.

    ```typescript
    export type UserPartial = Partial<UserModel>;
    ```

You can specify an array of `VariantType` values in the `modelVariants` configuration option to generate multiple variants for each model in your schema.

## Output File Structure

The output file structure depends on the `multiFiles` configuration option:

**`multiFiles: true`**

```
outputPath/
├── model/
│   ├── UserModel.ts
│   ├── PostModel.ts
│   ├── ... (other model files)
├── enum/
│   ├── RoleEnum.ts
│   ├── StatusEnum.ts
│   ├── ... (other enum files)
├── helper/
│   └── helper-types.ts  (Contains DecimalJsLike, JsonValueType, etc.)
└── index.ts           (Re-exports all types from model/ and enum/)
```

**`multiFiles: false`**

```
outputPath/
├── helper-types.ts  (Contains DecimalJsLike, JsonValueType, etc. - if needed)
└── index.ts           (Contains all generated types in a single file)
```

In both cases, `helper-types.ts` is generated only if your schema uses `Decimal` or `Json` types, providing necessary helper type definitions.

## Contributing

Contributions are welcome! Please feel free to submit issues, bug reports, feature requests, and pull requests on the [GitHub repository](https://github.com/your-github-username/prisma-to-ts-generator).

Before contributing, please:

1.  Fork the repository.
2.  Create a branch for your feature or bug fix.
3.  Ensure your code adheres to the project's coding style.
4.  Write tests for your changes if applicable.
5.  Submit a pull request with a clear description of your changes.

## License

[MIT License](LICENSE)

---

**Generated with ❤️ by `prisma-to-ts-generator`**
