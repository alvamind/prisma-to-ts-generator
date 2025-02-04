import type { Block } from '../Regular/Block';
import type { DynamicAttribute } from '../Regular/DynamicAttribute';
export interface BlockJournalOptionalRelations {
  id: number | null;
  block: Block | null;
  blockId: number | null;
  customFields: DynamicAttribute[] | null;
}
