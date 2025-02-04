import type { ProgressStatusEnum } from '../../enums/ProgressStatusEnum';
import type { Workspace } from '../Regular/Workspace';
import type { TaskStatus } from '../Regular/TaskStatus';
export interface BlockTaskStatusOptional {
  id: number | null;
  name: string | null;
  type: ProgressStatusEnum | null;
  timeSpent: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  workspace: Workspace | null;
  workspaceId: number | null;
  tasks: TaskStatus[] | null;
}
