import type { BlockTask } from '../Regular/BlockTask';
import type { BlockTaskStatus } from '../Regular/BlockTaskStatus';
export interface TaskStatusOptionalFullRelations {
  id: number | null;
  taskId: number | null;
  statusId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  task: BlockTask | null;
  status: BlockTaskStatus | null;
}
