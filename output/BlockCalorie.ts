import type { DecimalJsLike } from './helper-types';
import type { MealType } from './MealType';
import type { Block } from './Block';
import type { UserMeta } from './UserMeta';
export interface BlockCalorie {
  id: number;
  // Jumlah kalori
  calories: DecimalJsLike;
  // Ukuran porsi dalam gram
  servingSize: DecimalJsLike;
  // Jenis waktu makan
  mealType: MealType;
  // Opsional, jika ingin menghubungkan dengan Block
  block: Block;
  blockId: number;
  // dalam gram
  protein: DecimalJsLike | null;
  // dalam gram
  carbs: DecimalJsLike | null;
  // dalam gram
  fat: DecimalJsLike | null;
  // dalam gram
  fiber: DecimalJsLike | null;
  // dalam gram
  sugar: DecimalJsLike | null;
  userMeta: UserMeta;
  userMetaId: number;
}