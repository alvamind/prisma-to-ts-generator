import type { Block } from './Block';
import type { DynamicAttribute } from './DynamicAttribute';
export interface BlockJournal {
  id: number;
  block: Block;
  blockId: number;
  customFields: DynamicAttribute[];
}
