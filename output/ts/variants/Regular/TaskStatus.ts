import type { BlockTask } from './BlockTask';
import type { BlockTaskStatus } from './BlockTaskStatus';
export interface TaskStatus {
  id: number;
  taskId: number;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
  task: BlockTask;
  status: BlockTaskStatus;
}
