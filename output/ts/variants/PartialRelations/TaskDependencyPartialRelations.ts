import type { BlockTask } from '../Regular/BlockTask';
export interface TaskDependencyPartialRelations {
  id: number;
  waitingTaskId: number;
  blockingTaskId: number;
  waitingTask: BlockTask;
  blockingTask: BlockTask;
}
