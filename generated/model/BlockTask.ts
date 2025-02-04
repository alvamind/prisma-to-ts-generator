export interface BlockTask {
  id: number;
  start?: Date | null;
  end?: Date | null;
  timeEstimate: number;
  //cron notation
  recurrence?: string | null;
  lastRun?: Date | null;
  nextRun?: Date | null;
  AITaskPrompt?: string | null;
  block: Block;
  blockId: number;
  blockHabit?: BlockHabit | null;
  isLifeGoalOf?: UserMeta | null;
  AITaskScheduleOf: Block;
  AITaskScheduleOfId: number;
  onTimeBlock?: TimeBlock | null;
  onTimeBlockId?: number | null;
  reminders: TaskReminder[];
  statuses: TaskStatus[];
  customFields: DynamicAttribute[];
  waitingFor: TaskDependency[];
  blockingFor: TaskDependency[];
}

export type BlockTaskPartial = Partial<BlockTask>;

export type BlockTaskCreateInput = Omit<BlockTask, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<BlockTask, 'timeEstimate' | 'block' | 'blockId' | 'AITaskScheduleOf' | 'AITaskScheduleOfId' | 'reminders' | 'statuses' | 'customFields' | 'waitingFor' | 'blockingFor'>>;

export type BlockTaskUpdateInput = Partial<BlockTask>;
