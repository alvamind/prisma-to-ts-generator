import type { Block } from '../Regular/Block';
import type { Workspace } from '../Regular/Workspace';
export interface FolderOptionalFullRelations {
  id: number | null;
  name: string | null;
  blocks: Block[] | null;
  workspace: Workspace | null;
  workspaceId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
