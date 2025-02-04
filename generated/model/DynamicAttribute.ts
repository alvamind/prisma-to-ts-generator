export interface DynamicAttribute {
  id: number;
  name: string;
  description?: string | null;
  dataType: DataTypeEnum;
  value?: string | null;
  blockTask?: BlockTask | null;
  blockTaskId?: number | null;
  blockJournal?: BlockJournal | null;
  blockJournalId?: number | null;
  blockRitual?: BlockRitual | null;
  blockRitualId?: number | null;
  measurement?: Measurement | null;
  measurementId?: number | null;
  dynamicAttributeGroup?: DynamicAttributeGroup | null;
  dynamicAttributeGroupId?: number | null;
  workspace: Workspace;
  workspaceId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DynamicAttributePartial = Partial<DynamicAttribute>;

export type DynamicAttributeCreateInput = Omit<DynamicAttribute, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<DynamicAttribute, 'name' | 'dataType' | 'workspace' | 'workspaceId'>>;

export type DynamicAttributeUpdateInput = Partial<DynamicAttribute>;
