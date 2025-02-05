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

export type TaskStatusPartial = Partial<TaskStatus>;

export type TaskStatusCreateInput = Omit<TaskStatus, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<TaskStatus, 'taskId' | 'statusId' | 'task' | 'status'>>;

export type TaskStatusUpdateInput = Partial<TaskStatus>;
