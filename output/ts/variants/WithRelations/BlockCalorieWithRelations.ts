import type { DecimalJsLike } from '../../helper/helper-types';
import type { MealType } from '../../enums/MealType';
import type { Block } from '../Regular/Block';
import type { UserMeta } from '../Regular/UserMeta';
export interface BlockCalorieWithRelations {
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
