import type { Block } from './Block';
import type { Workspace } from './Workspace';
export interface Folder {
  id: number;
  name: string;
  blocks: Block[];
  workspace: Workspace;
  workspaceId: number;
  createdAt: Date;
  updatedAt: Date;
}