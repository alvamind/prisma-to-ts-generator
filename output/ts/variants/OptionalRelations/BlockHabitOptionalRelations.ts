import type { BlockTask } from '../Regular/BlockTask';
import type { ProgressStatusEnum } from '../../enums/ProgressStatusEnum';
export interface BlockHabitOptionalRelations {
  id: number | null;
  blockTask: BlockTask | null;
  blockTaskId: number | null;
  status: ProgressStatusEnum | null;
}
