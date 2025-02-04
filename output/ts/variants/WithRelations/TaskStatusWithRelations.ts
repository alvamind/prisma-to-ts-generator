import type { BlockTask } from '../Regular/BlockTask';
import type { BlockTaskStatus } from '../Regular/BlockTaskStatus';
export interface TaskStatusWithRelations {
  id: number;
  taskId: number;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
  task: BlockTask;
  status: BlockTaskStatus;
}
