import type { DayOfWeekEnum } from '../../enums/DayOfWeekEnum';
import type { User } from './User';
import type { BlockTask } from './BlockTask';
export interface TimeBlock {
  id: number;
  name: string;
  description: string | null;
  startTime: Date;
  // End time of the block
  endTime: Date;
  // Day of the week (e.g., Monday, Tuesday)
  dayOfWeek: DayOfWeekEnum;
  // Recurring block (e.g., every Monday)
  isRecurring: boolean;
  // Cron expression for recurring blocks
  recurrence: string | null;
  // User who owns the block
  userId: number;
  user: User;
  // Tasks assigned to this block
  tasks: BlockTask[];
  createdAt: Date;
  updatedAt: Date;
}
