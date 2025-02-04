import type { DynamicAttribute } from '../Regular/DynamicAttribute';
import type { Workspace } from '../Regular/Workspace';
export interface DynamicAttributeGroupOptionalFullRelations {
  id: number | null;
  name: string | null;
  description: string | null;
  attributes: DynamicAttribute[] | null;
  workspace: Workspace | null;
  workspaceId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
