import type { BlockTask } from './BlockTask';
export interface TaskDependency {
  id: number;
  waitingTaskId: number;
  blockingTaskId: number;
  waitingTask: BlockTask;
  blockingTask: BlockTask;
}