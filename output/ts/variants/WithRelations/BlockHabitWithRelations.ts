import type { BlockTask } from '../Regular/BlockTask';
import type { ProgressStatusEnum } from '../../enums/ProgressStatusEnum';
export interface BlockHabitWithRelations {
  id: number;
  blockTask: BlockTask;
  blockTaskId: number;
  status: ProgressStatusEnum;
}
