import type { BlockTask } from '../Regular/BlockTask';
import type { ProgressStatusEnum } from '../../enums/ProgressStatusEnum';
export interface BlockHabitPartialRelations {
  id: number;
  blockTask: BlockTask;
  blockTaskId: number;
  status: ProgressStatusEnum;
}
