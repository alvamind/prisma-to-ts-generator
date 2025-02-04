import type { DecimalJsLike } from '../../helper/helper-types';
import type { MealType } from '../../enums/MealType';
import type { Block } from '../Regular/Block';
import type { UserMeta } from '../Regular/UserMeta';
export interface BlockCalorieOptionalRelations {
  id: number | null;
  // Jumlah kalori
  calories: DecimalJsLike | null;
  // Ukuran porsi dalam gram
  servingSize: DecimalJsLike | null;
  // Jenis waktu makan
  mealType: MealType | null;
  // Opsional, jika ingin menghubungkan dengan Block
  block: Block | null;
  blockId: number | null;
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
  userMeta: UserMeta | null;
  userMetaId: number | null;
}
