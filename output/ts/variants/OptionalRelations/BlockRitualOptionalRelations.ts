import type { Block } from '../Regular/Block';
import type { DynamicAttribute } from '../Regular/DynamicAttribute';
import type { RitualCategory } from '../Regular/RitualCategory';
import type { User } from '../Regular/User';
import type { File } from '../Regular/File';
export interface BlockRitualOptionalRelations {
  id: number | null;
  block: Block | null;
  blockId: number | null;
  customFields: DynamicAttribute[] | null;
  category: RitualCategory | null;
  categoryId: number | null;
  coaches: User[] | null;
  references: File[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
