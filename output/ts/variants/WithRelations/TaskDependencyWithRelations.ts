import type { BlockTask } from '../Regular/BlockTask';
export interface TaskDependencyWithRelations {
  id: number;
  waitingTaskId: number;
  blockingTaskId: number;
  waitingTask: BlockTask;
  blockingTask: BlockTask;
}
