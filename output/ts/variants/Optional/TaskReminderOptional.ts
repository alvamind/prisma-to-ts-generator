import type { BlockTask } from '../Regular/BlockTask';
export interface TaskReminderOptional {
  id: number | null;
  // cron expression for scheduling
  schedule: string | null;
  message: string | null;
  isRead: boolean | null;
  lastRun: Date | null;
  nextRun: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  task: BlockTask | null;
  taskId: number | null;
}
