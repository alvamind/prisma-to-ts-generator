import type { ProgressStatusEnum } from './ProgressStatusEnum';
import type { Workspace } from './Workspace';
import type { TaskStatus } from './TaskStatus';
export interface BlockTaskStatus {
  id: number;
  name: string;
  type: ProgressStatusEnum;
  timeSpent: number | null;
  createdAt: Date;
  updatedAt: Date;
  workspace: Workspace;
  workspaceId: number;
  tasks: TaskStatus[];
}