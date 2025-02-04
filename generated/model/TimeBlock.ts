export interface TimeBlock {
  id: number;
  name: string;
  description?: string | null;
  startTime: Date;
  // End time of the block
  endTime: Date;
  // Day of the week (e.g., Monday, Tuesday)
  dayOfWeek: DayOfWeekEnum;
  // Recurring block (e.g., every Monday)
  isRecurring: boolean;
  // Cron expression for recurring blocks
  recurrence?: string | null;
  // User who owns the block
  userId: number;
  user: User;
  // Tasks assigned to this block
  tasks: BlockTask[];
  createdAt: Date;
  updatedAt: Date;
}

export type TimeBlockPartial = Partial<TimeBlock>;

export type TimeBlockCreateInput = Omit<TimeBlock, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<TimeBlock, 'name' | 'startTime' | 'endTime' | 'dayOfWeek' | 'isRecurring' | 'userId' | 'user' | 'tasks'>>;

export type TimeBlockUpdateInput = Partial<TimeBlock>;
