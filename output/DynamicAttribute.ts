import type { DataTypeEnum } from './DataTypeEnum';
import type { BlockTask } from './BlockTask';
import type { BlockJournal } from './BlockJournal';
import type { BlockRitual } from './BlockRitual';
import type { Measurement } from './Measurement';
import type { DynamicAttributeGroup } from './DynamicAttributeGroup';
import type { Workspace } from './Workspace';
export interface DynamicAttribute {
  id: number;
  name: string;
  description: string | null;
  dataType: DataTypeEnum;
  value: string | null;
  blockTask: BlockTask | null;
  blockTaskId: number | null;
  blockJournal: BlockJournal | null;
  blockJournalId: number | null;
  blockRitual: BlockRitual | null;
  blockRitualId: number | null;
  measurement: Measurement | null;
  measurementId: number | null;
  dynamicAttributeGroup: DynamicAttributeGroup | null;
  dynamicAttributeGroupId: number | null;
  workspace: Workspace;
  workspaceId: number;
  createdAt: Date;
  updatedAt: Date;
}