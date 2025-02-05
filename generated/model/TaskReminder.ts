import type { BlockTask } from './BlockTask';
export interface TaskReminder {
  id: number;
  // cron expression for scheduling
  schedule: string;
  message?: string | null;
  isRead: boolean;
  lastRun?: Date | null;
  nextRun?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  task: BlockTask;
  taskId: number;
}

export type TaskReminderPartial = Partial<TaskReminder>;

export type TaskReminderCreateInput = Omit<TaskReminder, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<TaskReminder, 'schedule' | 'isRead' | 'task' | 'taskId'>>;

export type TaskReminderUpdateInput = Partial<TaskReminder>;
