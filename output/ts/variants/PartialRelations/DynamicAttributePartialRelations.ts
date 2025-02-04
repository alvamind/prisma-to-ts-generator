import type { DataTypeEnum } from '../../enums/DataTypeEnum';
import type { BlockTask } from '../Regular/BlockTask';
import type { BlockJournal } from '../Regular/BlockJournal';
import type { BlockRitual } from '../Regular/BlockRitual';
import type { Measurement } from '../Regular/Measurement';
import type { DynamicAttributeGroup } from '../Regular/DynamicAttributeGroup';
import type { Workspace } from '../Regular/Workspace';
export interface DynamicAttributePartialRelations {
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
