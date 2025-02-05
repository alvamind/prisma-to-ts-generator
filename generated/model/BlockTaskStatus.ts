import type { ProgressStatusEnum } from '../enum/ProgressStatusEnum';
import type { Workspace } from './Workspace';
import type { TaskStatus } from './TaskStatus';
export interface BlockTaskStatus {
  id: number;
  name: string;
  type: ProgressStatusEnum;
  timeSpent?: number | null;
  createdAt: Date;
  updatedAt: Date;
  workspace: Workspace;
  workspaceId: number;
  tasks: TaskStatus[];
}

export type BlockTaskStatusPartial = Partial<BlockTaskStatus>;

export type BlockTaskStatusCreateInput = Omit<BlockTaskStatus, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<BlockTaskStatus, 'name' | 'type' | 'workspace' | 'workspaceId' | 'tasks'>>;

export type BlockTaskStatusUpdateInput = Partial<BlockTaskStatus>;
