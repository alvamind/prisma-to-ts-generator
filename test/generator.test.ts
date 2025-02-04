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
  beforeAll(() => {
    $`clear`;
    mkdirSync(testSchemaDir, { recursive: true });
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
});
