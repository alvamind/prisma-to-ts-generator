import type { Block } from '../Regular/Block';
import type { DynamicAttribute } from '../Regular/DynamicAttribute';
import type { RitualCategory } from '../Regular/RitualCategory';
import type { User } from '../Regular/User';
import type { File } from '../Regular/File';
export interface BlockRitualPartialRelations {
  id: number;
  block: Block;
  blockId: number;
  customFields: DynamicAttribute[];
  category: RitualCategory;
  categoryId: number;
  coaches: User[];
  references: File[];
  createdAt: Date;
  updatedAt: Date;
}
