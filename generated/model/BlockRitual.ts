import type { Block } from './Block';
import type { DynamicAttribute } from './DynamicAttribute';
import type { RitualCategory } from './RitualCategory';
import type { User } from './User';
import type { File } from './File';
export interface BlockRitual {
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

export type BlockRitualPartial = Partial<BlockRitual>;

export type BlockRitualCreateInput = Omit<BlockRitual, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<BlockRitual, 'block' | 'blockId' | 'customFields' | 'category' | 'categoryId' | 'coaches' | 'references'>>;

export type BlockRitualUpdateInput = Partial<BlockRitual>;
