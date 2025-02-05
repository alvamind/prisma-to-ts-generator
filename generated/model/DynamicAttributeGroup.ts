import type { DynamicAttribute } from './DynamicAttribute';
import type { Workspace } from './Workspace';
export interface DynamicAttributeGroup {
  id: number;
  name: string;
  description?: string | null;
  attributes: DynamicAttribute[];
  workspace: Workspace;
  workspaceId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DynamicAttributeGroupPartial = Partial<DynamicAttributeGroup>;

export type DynamicAttributeGroupCreateInput = Omit<DynamicAttributeGroup, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<DynamicAttributeGroup, 'name' | 'attributes' | 'workspace' | 'workspaceId'>>;

export type DynamicAttributeGroupUpdateInput = Partial<DynamicAttributeGroup>;
