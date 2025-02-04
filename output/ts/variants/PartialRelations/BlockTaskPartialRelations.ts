import type { Block } from '../Regular/Block';
import type { BlockHabit } from '../Regular/BlockHabit';
import type { UserMeta } from '../Regular/UserMeta';
import type { TimeBlock } from '../Regular/TimeBlock';
import type { TaskReminder } from '../Regular/TaskReminder';
import type { TaskStatus } from '../Regular/TaskStatus';
import type { DynamicAttribute } from '../Regular/DynamicAttribute';
import type { TaskDependency } from '../Regular/TaskDependency';
export interface BlockTaskPartialRelations {
  id: number;
  start: Date | null;
  end: Date | null;
  timeEstimate: number;
  //cron notation
  recurrence: string | null;
  lastRun: Date | null;
  nextRun: Date | null;
  AITaskPrompt: string | null;
  block: Block;
  blockId: number;
  blockHabit: BlockHabit | null;
  isLifeGoalOf: UserMeta | null;
  AITaskScheduleOf: Block;
  AITaskScheduleOfId: number;
  onTimeBlock: TimeBlock | null;
  onTimeBlockId: number | null;
  reminders: TaskReminder[];
  statuses: TaskStatus[];
  customFields: DynamicAttribute[];
  waitingFor: TaskDependency[];
  blockingFor: TaskDependency[];
}
