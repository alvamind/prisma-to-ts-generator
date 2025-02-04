import type { Block } from '../Regular/Block';
import type { DynamicAttribute } from '../Regular/DynamicAttribute';
export interface BlockJournalWithRelations {
  id: number;
  block: Block;
  blockId: number;
  customFields: DynamicAttribute[];
}
