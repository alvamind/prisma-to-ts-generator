import type { BlockTask } from './BlockTask';
export interface TaskReminder {
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