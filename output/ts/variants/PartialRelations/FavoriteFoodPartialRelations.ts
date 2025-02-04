import type { DecimalJsLike } from '../../helper/helper-types';
import type { UserMeta } from '../Regular/UserMeta';
export interface FavoriteFoodPartialRelations {
  id: number;
  foodName: string;
  calories: DecimalJsLike;
  servingSize: DecimalJsLike;
  protein: DecimalJsLike | null;
  carbs: DecimalJsLike | null;
  fat: DecimalJsLike | null;
  fiber: DecimalJsLike | null;
  sugar: DecimalJsLike | null;
  userMeta: UserMeta;
  userMetaId: number;
  createdAt: Date;
  updatedAt: Date;
}
