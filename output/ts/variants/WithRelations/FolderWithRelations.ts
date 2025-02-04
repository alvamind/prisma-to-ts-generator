import type { Block } from '../Regular/Block';
import type { Workspace } from '../Regular/Workspace';
export interface FolderWithRelations {
  id: number;
  name: string;
  blocks: Block[];
  workspace: Workspace;
  workspaceId: number;
  createdAt: Date;
  updatedAt: Date;
}
