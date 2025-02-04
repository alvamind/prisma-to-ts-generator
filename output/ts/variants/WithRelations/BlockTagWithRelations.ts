import type { Block } from '../Regular/Block';
export interface BlockTagWithRelations {
  id: number;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
  parentTag: BlockTag | null;
  parentTagId: number | null;
  block: Block;
  blockId: number;
  childTags: BlockTag[];
}
