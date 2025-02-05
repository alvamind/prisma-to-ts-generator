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

export type FolderPartial = Partial<Folder>;

export type FolderCreateInput = Omit<Folder, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<Folder, 'name' | 'blocks' | 'workspace' | 'workspaceId'>>;

export type FolderUpdateInput = Partial<Folder>;
