import type { Block } from '../Regular/Block';
export interface BlockTagOptionalRelations {
  id: number | null;
  name: string | null;
  description: string | null;
  color: string | null;
  icon: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  parentTag: BlockTag | null;
  parentTagId: number | null;
  block: Block | null;
  blockId: number | null;
  childTags: BlockTag[] | null;
}
