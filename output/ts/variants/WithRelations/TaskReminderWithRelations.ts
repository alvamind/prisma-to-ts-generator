import type { BlockTask } from '../Regular/BlockTask';
export interface TaskReminderWithRelations {
  id: number;
  // cron expression for scheduling
  schedule: string;
  message: string | null;
  isRead: boolean;
  lastRun: Date | null;
  nextRun: Date | null;
  createdAt: Date;
  updatedAt: Date;
  task: BlockTask;
  taskId: number;
}
