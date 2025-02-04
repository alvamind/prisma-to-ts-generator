import type { BlockTask } from './BlockTask';
import type { ProgressStatusEnum } from './ProgressStatusEnum';
export interface BlockHabit {
  id: number;
  blockTask: BlockTask;
  blockTaskId: number;
  status: ProgressStatusEnum;
}