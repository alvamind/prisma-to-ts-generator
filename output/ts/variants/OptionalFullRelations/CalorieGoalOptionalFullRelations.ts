import type { DecimalJsLike } from '../../helper/helper-types';
import type { UserMeta } from '../Regular/UserMeta';
export interface CalorieGoalOptionalFullRelations {
  id: number | null;
  targetCalories: DecimalJsLike | null;
  userMeta: UserMeta | null;
  userMetaId: number | null;
  targetProtein: DecimalJsLike | null;
  targetCarbs: DecimalJsLike | null;
  targetFat: DecimalJsLike | null;
  targetFiber: DecimalJsLike | null;
  createdAt: Date | null;
}
