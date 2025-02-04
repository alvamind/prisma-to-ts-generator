import type { Block } from '../Regular/Block';
import type { BlockHabit } from '../Regular/BlockHabit';
import type { UserMeta } from '../Regular/UserMeta';
import type { TimeBlock } from '../Regular/TimeBlock';
import type { TaskReminder } from '../Regular/TaskReminder';
import type { TaskStatus } from '../Regular/TaskStatus';
import type { DynamicAttribute } from '../Regular/DynamicAttribute';
import type { TaskDependency } from '../Regular/TaskDependency';
export interface BlockTaskOptionalRelations {
  id: number | null;
  start: Date | null;
  end: Date | null;
  timeEstimate: number | null;
  //cron notation
  recurrence: string | null;
  lastRun: Date | null;
  nextRun: Date | null;
  AITaskPrompt: string | null;
  block: Block | null;
  blockId: number | null;
  blockHabit: BlockHabit | null;
  isLifeGoalOf: UserMeta | null;
  AITaskScheduleOf: Block | null;
  AITaskScheduleOfId: number | null;
  onTimeBlock: TimeBlock | null;
  onTimeBlockId: number | null;
  reminders: TaskReminder[] | null;
  statuses: TaskStatus[] | null;
  customFields: DynamicAttribute[] | null;
  waitingFor: TaskDependency[] | null;
  blockingFor: TaskDependency[] | null;
}
