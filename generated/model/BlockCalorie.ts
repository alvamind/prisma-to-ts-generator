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
  protein?: DecimalJsLike | null;
  // dalam gram
  carbs?: DecimalJsLike | null;
  // dalam gram
  fat?: DecimalJsLike | null;
  // dalam gram
  fiber?: DecimalJsLike | null;
  // dalam gram
  sugar?: DecimalJsLike | null;
  userMeta: UserMeta;
  userMetaId: number;
}

export type BlockCaloriePartial = Partial<BlockCalorie>;

export type BlockCalorieCreateInput = Omit<BlockCalorie, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<BlockCalorie, 'calories' | 'servingSize' | 'mealType' | 'block' | 'blockId' | 'userMeta' | 'userMetaId'>>;

export type BlockCalorieUpdateInput = Partial<BlockCalorie>;
