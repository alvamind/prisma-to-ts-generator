import type { DynamicAttribute } from './DynamicAttribute';
import type { Workspace } from './Workspace';
export interface DynamicAttributeGroup {
  id: number;
  name: string;
  description: string | null;
  attributes: DynamicAttribute[];
  workspace: Workspace;
  workspaceId: number;
  createdAt: Date;
  updatedAt: Date;
}
