import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  rmSync,
} from 'fs';
import path from 'path';
import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'bun:test';
import { generate } from '../src/generator';
import { $ } from 'bun';

const outputDir = path.join(process.cwd(), 'output');
const testSchemaDir = path.join(process.cwd(), 'test-schema');
const testSchemaPath1 = path.join(testSchemaDir, 'test1.prisma');
const testSchemaPath2 = path.join(testSchemaDir, 'test2.prisma');
const nestedSchemaDir = path.join(testSchemaDir, 'nested');
const nestedSchemaPath = path.join(nestedSchemaDir, 'nested.prisma');


// Helper function with precise reading
const readOutput = (fileName: string) => {
  const filePath = path.join(outputDir, fileName);
  return existsSync(filePath) ? readFileSync(filePath, 'utf-8') : null;
};

// Helper function for writing test schemas
const setupTestSchema = (schema: string, filePath: string) => {
  writeFileSync(filePath, schema.trim().replace(/^\s+/gm, ''));
};

describe('TS Interface Generator', () => {
  beforeAll(async () => {
    await $`clear`;
    mkdirSync(testSchemaDir, { recursive: true });
    mkdirSync(nestedSchemaDir, { recursive: true });

    setupTestSchema(`
            model User {
                id        Int      @id @default(autoincrement())
                email     String   @unique
                firstName String?
                lastName  String?
                posts     Post[]
                profile   Profile?
            }

            model Post {
                id        Int     @id @default(autoincrement())
                title     String
                content   String?
                author    User    @relation(fields: [authorId], references: [id])
                authorId  Int
            }

            model Profile {
                id        Int     @id @default(autoincrement())
                bio       String?
                userId    Int     @unique
                user      User    @relation(fields: [userId], references: [id])
            }

            enum UserRole {
                USER
                ADMIN
            }

            type CompositeType {
                fieldA String
                fieldB Int
            }
        `, testSchemaPath1);

    setupTestSchema(`
            model Category {
                id   Int    @id @default(autoincrement())
                name String
                products Product[]
            }

            model Product {
                id         Int    @id @default(autoincrement())
                name       String
                category   Category @relation(fields: [categoryId], references: [id])
                categoryId Int
            }
            enum Status {
                ACTIVE
                INACTIVE
            }
        `, testSchemaPath2);

    setupTestSchema(`
            model NestedModel {
                id Int @id
                value String
            }
        `, nestedSchemaPath);
  });


  beforeEach(() => {
    if (existsSync(outputDir)) rmSync(outputDir, { recursive: true, force: true });
    mkdirSync(outputDir, { recursive: true })
  });


  it('should generate exact User interface structure', () => {
    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();

    expect(userSchema).toContain(
      `import type { Post } from './Post';
import type { Profile } from './Profile';
export interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  posts: Post[];
  profile: Profile | null;
}`
    );
  });

  it('should generate exact Post interface structure', () => {
    generate([testSchemaPath1, testSchemaPath2]);
    const postSchema = readOutput('Post.ts')?.trim();

    expect(postSchema).toContain(
      `import type { User } from './User';
export interface Post {
  id: number;
  title: string;
  content: string | null;
  author: User;
  authorId: number;
}`
    );
  });

  it('should generate exact Profile interface structure', () => {
    generate([testSchemaPath1, testSchemaPath2]);
    const profileSchema = readOutput('Profile.ts')?.trim();

    expect(profileSchema).toContain(
      `import type { User } from './User';
export interface Profile {
  id: number;
  bio: string | null;
  userId: number;
  user: User;
}`
    );
  });

  it('should generate exact UserRole enum structure', () => {
    generate([testSchemaPath1, testSchemaPath2]);
    const enumSchema = readOutput('UserRole.ts')?.trim();

    expect(enumSchema).toBe(
      `export type UserRole = 'USER' | 'ADMIN';`
    );
  });

  it('should generate exact CompositeType structure', () => {
    generate([testSchemaPath1, testSchemaPath2]);
    const compositeSchema = readOutput('CompositeType.ts')?.trim();

    expect(compositeSchema).toBe(
      `export interface CompositeType {
  fieldA: string;
  fieldB: number;
}`
    );
  });

  it('should generate exact Category structure', () => {
    generate([testSchemaPath1, testSchemaPath2]);
    const categorySchema = readOutput('Category.ts')?.trim();

    expect(categorySchema).toContain(
      `import type { Product } from './Product';
export interface Category {
  id: number;
  name: string;
  products: Product[];
}`
    );
  });

  it('should generate exact Product structure', () => {
    generate([testSchemaPath1, testSchemaPath2]);
    const productSchema = readOutput('Product.ts')?.trim();

    expect(productSchema).toContain(
      `import type { Category } from './Category';
export interface Product {
  id: number;
  name: string;
  category: Category;
  categoryId: number;
}`
    );
  });


  it('should generate exact Status enum structure', () => {
    generate([testSchemaPath1, testSchemaPath2]);
    const enumSchema = readOutput('Status.ts')?.trim();
    expect(enumSchema).toBe(
      `export type Status = 'ACTIVE' | 'INACTIVE';`
    );
  });

  it('should handle BigInt type', () => {
    setupTestSchema(`model BigIntModel {
      id BigInt @id
      }`, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('BigIntModel.ts')?.trim()).toInclude('id: bigint;');
  });

  // 2. Bytes Type
  it('should handle Bytes type', () => {
    setupTestSchema(`model BytesModel {
      data Bytes
      }`, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('BytesModel.ts')?.trim()).toInclude('data: Buffer;');
  });

  // 3. Default Values
  it('should handle @default attributes', () => {
    setupTestSchema(`
      model Defaults {
        id      String  @id @default(cuid())
        active  Boolean @default(true)
        createdAt DateTime @default(now())
      }
    `, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('Defaults.ts')?.trim();
    expect(schema).toInclude('id: string;');
    expect(schema).toInclude('active: boolean;');
    expect(schema).toInclude('createdAt: Date;');
  });

  // 4. JSON Type
  it('should handle Json type', () => {
    setupTestSchema(`model JsonModel {
      data Json
      }`, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('JsonModel.ts')?.trim()).toInclude('data: any;');
  });

  // 5. UpdatedAt Attribute
  it('should handle @updatedAt', () => {
    setupTestSchema(`model Timestamps {
      updatedAt DateTime @updatedAt
      }`, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('Timestamps.ts')?.trim()).toInclude('updatedAt: Date;');
  });

  // 6. Map Attribute
  it('should handle @map attribute', () => {
    setupTestSchema(`
      model Mapped {
        id Int @id @map("primary_key")
        name String @map("full_name")
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('Mapped.ts')?.trim();
    expect(schema).toInclude('id: number;');
    expect(schema).toInclude('name: string;');
  });

  // 7. Self Relations
  it('should handle self-relations', () => {
    setupTestSchema(`
      model Employee {
        id       Int       @id
        manager  Employee? @relation("Management")
        reports  Employee[] @relation("Management")
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('Employee.ts')?.trim();
    expect(schema).toInclude('manager: Employee | null;');
    expect(schema).toInclude('reports: Employee[];');
  });

  // 8. Multi-field IDs
  it('should handle @@id', () => {
    setupTestSchema(`
      model CompoundId {
        a Int
        b Int
        @@id([a, b])
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('CompoundId.ts')?.trim()).toBe(
      `export interface CompoundId {
  a: number;
  b: number;
}`
    );
  });

  // 9. Indexes
  it('should ignore @@index', () => {
    setupTestSchema(`
      model Indexed {
        id Int @id
        name String
        @@index([name])
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('Indexed.ts')?.trim()).not.toInclude('@@index');
  });

  // 10. Optional vs Nullable
  it('should differentiate optional and nullable', () => {
    setupTestSchema(`
      model NullOptional {
        opt String?
        nul String @nullable
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('NullOptional.ts')?.trim();
    expect(schema).toInclude('opt: string | null;');
    expect(schema).toInclude('nul: string | null;');
  });

  // 11. Enum Arrays
  it('should handle enum arrays', () => {
    setupTestSchema(`
      enum Role {
      USER
      ADMIN
      }
      model User {
        id   Int    @id
        roles Role[]
      }
    `, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();
    expect(userSchema).toInclude('roles: Role[];');
  });

  // 12. Decimal Type
  it('should handle Decimal type', () => {
    setupTestSchema(`model Money {
      amount Decimal
      }`, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('Money.ts')?.trim()).toInclude('amount: string;');
  });

  // 13. Unsupported Types
  it('should mark unsupported types as string', () => {
    setupTestSchema(`model Unsupported {
      data UnsupportedType
      }`, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('Unsupported.ts')?.trim()).toInclude('data: string;');
  });


  // 14. Map Enum
  it('should handle mapped enums', () => {
    setupTestSchema(`
      enum MappedEnum {
        A @map("alpha")
        B @map("beta")
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('MappedEnum.ts')?.trim()).toBe(
      `export type MappedEnum = 'A' | 'B';`
    );
  });

  // 15. Custom Type Comments
  it('should preserve comments', () => {
    setupTestSchema(`
        /// User model comment
        model Commented {
          /// Field comment
          id Int @id
        }
      `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('Commented.ts')?.trim();
    expect(schema).toContain('/// User model comment');
    expect(schema).toContain('/// Field comment');
  });


  // 16. Type Aliases
  it('should handle type aliases', () => {
    setupTestSchema(`
      type Address {
        street String
        city String
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('Address.ts')?.trim()).toBe(
      `export interface Address {
  street: string;
  city: string;
}`
    );
  });

  // 17. Multi-schema Files
  it('should handle multiple schemas', () => {
    setupTestSchema(`
      model A {
      id Int @id
      }
      model B {
      id Int @id
      a A @relation(fields: [aId], references: [id])
      aId Int }
    `, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    const bSchema = readOutput('B.ts')?.trim();
    expect(bSchema).toInclude('a: A;');
  });

  // 18. Field Name Sanitization
  it('should sanitize reserved keywords', () => {
    setupTestSchema(`model Reserved {
      delete Boolean
      }`, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('Reserved.ts')?.trim()).toInclude('delete: boolean;');
  });

  // 19. Empty Model
  it('should handle empty models', () => {
    setupTestSchema(`model Empty {
}`, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    expect(readOutput('Empty.ts')?.trim()).toBe(
      `export interface Empty {}`
    );
  });

  // 20. Complex Composite Types
  it('should handle nested composite types', () => {
    setupTestSchema(`
      type Address {
        street String
        city String
        coordinates Coordinate
      }

      type Coordinate {
        lat Float
        lng Float
      }
    `, testSchemaPath1);
    generate([testSchemaPath1, testSchemaPath2]);
    const addressSchema = readOutput('Address.ts')?.trim();
    expect(addressSchema).toInclude('coordinates: Coordinate;');
  });

  // 21. Array of Composite Types
  it('should handle arrays of composite types', () => {
    setupTestSchema(`
      type Coordinate {
        lat Float
        lng Float
      }

      model Location {
        id Int @id
        points Coordinate[]
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const locationSchema = readOutput('Location.ts')?.trim();
    expect(locationSchema).toInclude('points: Coordinate[];');
  });

  // 22. Optional Composite Types
  it('should handle optional composite types', () => {
    setupTestSchema(`
      type Address {
        street String
        city String
      }

      model User {
        id Int @id
        address Address?
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();
    expect(userSchema).toInclude('address: Address | null;');
  });


  //23

  // 24. Custom Scalar Types
  it('should handle custom scalar types', () => {
    setupTestSchema(`
      scalar Email

      model User {
        id Int @id
        email Email
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();
    expect(userSchema).toInclude('email: string;');
  });

  // 25. Multiple Relations to Same Model
  it('should handle multiple relations to the same model', () => {
    setupTestSchema(`
      model User {
        id Int @id
        writtenPosts Post[]
        reviewedPosts Post[]
      }

      model Post {
        id Int @id
        author User @relation(fields: [authorId], references: [id])
        authorId Int
        reviewer User @relation(fields: [reviewerId], references: [id])
        reviewerId Int
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();
    expect(userSchema).toInclude('writtenPosts: Post[];');
    expect(userSchema).toInclude('reviewedPosts: Post[];');
  });

  // 26. Mixed Optional and Nullable Fields
  it('should handle mixed optional and nullable fields', () => {
    setupTestSchema(`
      model MixedOptionalNullable {
        id Int @id
        optionalField String?
        nullableField String @nullable
        optionalNullableField String? @nullable
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('MixedOptionalNullable.ts')?.trim();
    expect(schema).toInclude('optionalField: string | null;');
    expect(schema).toInclude('nullableField: string | null;');
    expect(schema).toInclude('optionalNullableField: string | null;');
  });

  // 27. Complex Enum Usage
  it('should handle complex enum usage', () => {
    setupTestSchema(`
      enum Status {
        ACTIVE
        INACTIVE
        PENDING
      }

      model User {
        id Int @id
        status Status
        previousStatuses Status[]
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();
    expect(userSchema).toInclude('status: Status;');
    expect(userSchema).toInclude('previousStatuses: Status[];');
  });

  // 28. Model with No Relations
  it('should handle models with no relations', () => {
    setupTestSchema(`
      model NoRelations {
        id Int @id
        name String
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('NoRelations.ts')?.trim();
    expect(schema).toInclude(
      `export interface NoRelations {
  id: number;
  name: string;
}`
    );
  });

  // 29. Model with Only Optional Fields
  it('should handle models with only optional fields', () => {
    setupTestSchema(`
      model AllOptional {
      id Int @id
      name String?
      age Int?
    }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('AllOptional.ts')?.trim();
    expect(schema).toBe(
      `export interface AllOptional {
  id: number;
  name: string | null;
  age: number | null;
}`
    );
  });

  // 30. Model with Only Required Fields
  it('should handle models with only required fields', () => {
    setupTestSchema(`
      model AllRequired {
        id Int @id
        name String
        age Int
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('AllRequired.ts')?.trim();
    expect(schema).toBe(
      `export interface AllRequired {
  id: number;
  name: string;
  age: number;
}`
    );
  });

  // 31. Model with Mixed Array Types
  it('should handle models with mixed array types', () => {
    setupTestSchema(`
      model MixedArrays {
        id Int @id
        names String[]
        ages Int[]
        flags Boolean[]
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('MixedArrays.ts')?.trim();
    expect(schema).toInclude('names: string[];');
    expect(schema).toInclude('ages: number[];');
    expect(schema).toInclude('flags: boolean[];');
  });

  // 32. Model with Complex Default Values
  it('should handle models with complex default values', () => {
    setupTestSchema(`
      model ComplexDefaults {
        id Int @id @default(autoincrement())
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
        active Boolean @default(true)
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('ComplexDefaults.ts')?.trim();
    expect(schema).toInclude('id: number;');
    expect(schema).toInclude('createdAt: Date;');
    expect(schema).toInclude('updatedAt: Date;');
    expect(schema).toInclude('active: boolean;');
  });

  // 33. Model with Multiple Enums
  it('should handle models with multiple enums', () => {
    setupTestSchema(`
      enum Role {
        USER
        ADMIN
      }

      enum Status {
        ACTIVE
        INACTIVE
      }

      model User {
        id Int @id
        role Role
        status Status
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();
    expect(userSchema).toInclude('role: Role;');
    expect(userSchema).toInclude('status: Status;');
  });

  // 34. Model with Multiple Composite Types
  it('should handle models with multiple composite types', () => {
    setupTestSchema(`
      type Address {
        street String
        city String
      }

      type Contact {
        phone String
        email String
      }

      model User {
        id Int @id
        address Address
        contact Contact
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();
    expect(userSchema).toInclude('address: Address;');
    expect(userSchema).toInclude('contact: Contact;');
  });

  // 35. Model with Nested Composite Types
  it('should handle models with nested composite types', () => {
    setupTestSchema(`
      type Coordinate {
        lat Float
        lng Float
      }

      type Address {
        street String
        city String
        coordinates Coordinate
      }

      model User {
        id Int @id
        address Address
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();
    expect(userSchema).toInclude('address: Address;');
  });

  // 36. Model with Optional Arrays
  it('should handle models with optional arrays', () => {
    setupTestSchema(`
      model OptionalArrays {
        id Int @id
        names String[]
        ages Int[]
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('OptionalArrays.ts')?.trim();
    expect(schema).toInclude('names: string[];');
    expect(schema).toInclude('ages: number[];');
  });

  // 37. Model with Nullable Arrays
  it('should handle models with nullable arrays', () => {
    setupTestSchema(`
      model NullableArrays {
        id Int @id
        names String[] @nullable
        ages Int[] @nullable
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('NullableArrays.ts')?.trim();
    expect(schema).toInclude('names: string[] | null;');
    expect(schema).toInclude('ages: number[] | null;');
  });

  // 38. Model with Mixed Optional and Nullable Arrays
  it('should handle models with mixed optional and nullable arrays', () => {
    setupTestSchema(`
      model MixedArrays {
        id Int @id
        optionalNames String[]
        nullableAges Int[] @nullable
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const schema = readOutput('MixedArrays.ts')?.trim();
    expect(schema).toInclude('optionalNames: string[];');
    expect(schema).toInclude('nullableAges: number[] | null;');
  });

  // 39. Model with Complex Relations
  it('should handle models with complex relations', () => {
    setupTestSchema(`
      model User {
        id Int @id
        posts Post[]
      }

      model Post {
        id Int @id
        author User @relation(fields: [authorId], references: [id])
        authorId Int
        comments Comment[]
      }

      model Comment {
        id Int @id
        post Post @relation(fields: [postId], references: [id])
        postId Int
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();
    expect(userSchema).toInclude('posts: Post[];');
    const postSchema = readOutput('Post.ts')?.trim();
    expect(postSchema).toInclude('comments: Comment[];');
  });

  // 40. Model with Multiple Composite Types and Enums
  it('should handle models with multiple composite types and enums', () => {
    setupTestSchema(`
      enum Role {
        USER
        ADMIN
      }

      type Address {
        street String
        city String
      }

      type Contact {
        phone String
        email String
      }

      model User {
        id Int @id
        role Role
        address Address
        contact Contact
      }
    `, testSchemaPath1);

    generate([testSchemaPath1, testSchemaPath2]);
    const userSchema = readOutput('User.ts')?.trim();
    expect(userSchema).toInclude('role: Role;');
    expect(userSchema).toInclude('address: Address;');
    expect(userSchema).toInclude('contact: Contact;');
  });

  // 41. Should handle directory path
  it('should handle directory path and nested schema', () => {
    generate([testSchemaDir]);
    expect(readOutput('NestedModel.ts')?.trim()).toInclude(`export interface NestedModel`);
    expect(readOutput('User.ts')?.trim()).toInclude(`export interface User`);
    expect(readOutput('Category.ts')?.trim()).toInclude(`export interface Category`);
  });

  // 42. Should handle mixed file and directory paths
  it('should handle mixed file and directory paths', () => {
    generate([testSchemaDir, testSchemaPath2]); // testSchemaPath2 is redundant but should not break
    expect(readOutput('NestedModel.ts')?.trim()).toInclude(`export interface NestedModel`);
    expect(readOutput('User.ts')?.trim()).toInclude(`export interface User`);
    expect(readOutput('Category.ts')?.trim()).toInclude(`export interface Category`);
    expect(readOutput('Product.ts')?.trim()).toInclude(`export interface Product`);
  });
});
