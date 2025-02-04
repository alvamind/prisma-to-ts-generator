import type { DecimalJsLike } from '../../helper/helper-types';
import type { UserMeta } from './UserMeta';
export interface CalorieGoal {
  id: number;
  targetCalories: DecimalJsLike;
  userMeta: UserMeta;
  userMetaId: number;
  targetProtein: DecimalJsLike | null;
  targetCarbs: DecimalJsLike | null;
  targetFat: DecimalJsLike | null;
  targetFiber: DecimalJsLike | null;
  createdAt: Date;
}
