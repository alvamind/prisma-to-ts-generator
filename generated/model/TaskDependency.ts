import type { BlockTask } from './BlockTask';
export interface TaskDependency {
  id: number;
  waitingTaskId: number;
  blockingTaskId: number;
  waitingTask: BlockTask;
  blockingTask: BlockTask;
}

export type TaskDependencyPartial = Partial<TaskDependency>;

export type TaskDependencyCreateInput = Omit<TaskDependency, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<TaskDependency, 'waitingTaskId' | 'blockingTaskId' | 'waitingTask' | 'blockingTask'>>;

export type TaskDependencyUpdateInput = Partial<TaskDependency>;
