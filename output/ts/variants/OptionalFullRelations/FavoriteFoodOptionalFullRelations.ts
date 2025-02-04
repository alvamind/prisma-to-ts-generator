import type { DecimalJsLike } from '../../helper/helper-types';
import type { UserMeta } from '../Regular/UserMeta';
export interface FavoriteFoodOptionalFullRelations {
  id: number | null;
  foodName: string | null;
  calories: DecimalJsLike | null;
  servingSize: DecimalJsLike | null;
  protein: DecimalJsLike | null;
  carbs: DecimalJsLike | null;
  fat: DecimalJsLike | null;
  fiber: DecimalJsLike | null;
  sugar: DecimalJsLike | null;
  userMeta: UserMeta | null;
  userMetaId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
