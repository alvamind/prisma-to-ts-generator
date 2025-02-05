import type { Block } from './Block';
export interface BlockTag {
  id: number;
  name: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  createdAt: Date;
  updatedAt: Date;
  parentTag?: BlockTag | null;
  parentTagId?: number | null;
  block: Block;
  blockId: number;
  childTags: BlockTag[];
}

export type BlockTagPartial = Partial<BlockTag>;

export type BlockTagCreateInput = Omit<BlockTag, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<BlockTag, 'name' | 'block' | 'blockId' | 'childTags'>>;

export type BlockTagUpdateInput = Partial<BlockTag>;
