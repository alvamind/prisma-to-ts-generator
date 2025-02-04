import type { ProgressStatusEnum } from '../../enums/ProgressStatusEnum';
import type { Workspace } from '../Regular/Workspace';
import type { TaskStatus } from '../Regular/TaskStatus';
export interface BlockTaskStatusPartialRelations {
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
