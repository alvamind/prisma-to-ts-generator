import type { DynamicAttribute } from '../Regular/DynamicAttribute';
import type { Workspace } from '../Regular/Workspace';
export interface DynamicAttributeGroupWithRelations {
  id: number;
  name: string;
  description: string | null;
  attributes: DynamicAttribute[];
  workspace: Workspace;
  workspaceId: number;
  createdAt: Date;
  updatedAt: Date;
}
