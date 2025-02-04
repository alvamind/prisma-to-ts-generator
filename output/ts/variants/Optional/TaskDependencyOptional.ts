import type { BlockTask } from '../Regular/BlockTask';
export interface TaskDependencyOptional {
  id: number | null;
  waitingTaskId: number | null;
  blockingTaskId: number | null;
  waitingTask: BlockTask | null;
  blockingTask: BlockTask | null;
}
