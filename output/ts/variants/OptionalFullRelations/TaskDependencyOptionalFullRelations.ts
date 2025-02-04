import type { BlockTask } from '../Regular/BlockTask';
export interface TaskDependencyOptionalFullRelations {
  id: number | null;
  waitingTaskId: number | null;
  blockingTaskId: number | null;
  waitingTask: BlockTask | null;
  blockingTask: BlockTask | null;
}
