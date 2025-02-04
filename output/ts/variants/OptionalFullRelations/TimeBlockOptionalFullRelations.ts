import type { DayOfWeekEnum } from '../../enums/DayOfWeekEnum';
import type { User } from '../Regular/User';
import type { BlockTask } from '../Regular/BlockTask';
export interface TimeBlockOptionalFullRelations {
  id: number | null;
  name: string | null;
  description: string | null;
  startTime: Date | null;
  // End time of the block
  endTime: Date | null;
  // Day of the week (e.g., Monday, Tuesday)
  dayOfWeek: DayOfWeekEnum | null;
  // Recurring block (e.g., every Monday)
  isRecurring: boolean | null;
  // Cron expression for recurring blocks
  recurrence: string | null;
  // User who owns the block
  userId: number | null;
  user: User | null;
  // Tasks assigned to this block
  tasks: BlockTask[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
