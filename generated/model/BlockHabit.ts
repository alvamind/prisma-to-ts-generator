import type { BlockTask } from './BlockTask';
import type { ProgressStatusEnum } from '../enum/ProgressStatusEnum';
export interface BlockHabit {
  id: number;
  blockTask: BlockTask;
  blockTaskId: number;
  status: ProgressStatusEnum;
}

export type BlockHabitPartial = Partial<BlockHabit>;

export type BlockHabitCreateInput = Omit<BlockHabit, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<BlockHabit, 'blockTask' | 'blockTaskId' | 'status'>>;

export type BlockHabitUpdateInput = Partial<BlockHabit>;
