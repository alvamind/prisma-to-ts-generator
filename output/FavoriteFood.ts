import type { DecimalJsLike } from './helper-types';
import type { UserMeta } from './UserMeta';
export interface FavoriteFood {
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