export interface FavoriteFood {
  id: number;
  foodName: string;
  calories: DecimalJsLike;
  servingSize: DecimalJsLike;
  protein?: DecimalJsLike | null;
  carbs?: DecimalJsLike | null;
  fat?: DecimalJsLike | null;
  fiber?: DecimalJsLike | null;
  sugar?: DecimalJsLike | null;
  userMeta: UserMeta;
  userMetaId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type FavoriteFoodPartial = Partial<FavoriteFood>;

export type FavoriteFoodCreateInput = Omit<FavoriteFood, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<FavoriteFood, 'foodName' | 'calories' | 'servingSize' | 'userMeta' | 'userMetaId'>>;

export type FavoriteFoodUpdateInput = Partial<FavoriteFood>;
