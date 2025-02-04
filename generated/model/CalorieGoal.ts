export interface CalorieGoal {
  id: number;
  targetCalories: DecimalJsLike;
  userMeta: UserMeta;
  userMetaId: number;
  targetProtein?: DecimalJsLike | null;
  targetCarbs?: DecimalJsLike | null;
  targetFat?: DecimalJsLike | null;
  targetFiber?: DecimalJsLike | null;
  createdAt: Date;
}

export type CalorieGoalPartial = Partial<CalorieGoal>;

export type CalorieGoalCreateInput = Omit<CalorieGoal, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<CalorieGoal, 'targetCalories' | 'userMeta' | 'userMetaId'>>;

export type CalorieGoalUpdateInput = Partial<CalorieGoal>;
