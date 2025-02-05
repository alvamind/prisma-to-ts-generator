import type { GenderEnum } from '../enum/GenderEnum';
import type { RelationshipEnum } from '../enum/RelationshipEnum';
import type { User } from './User';
import type { BlockTask } from './BlockTask';
import type { UserCharacter } from './UserCharacter';
import type { CalorieGoal } from './CalorieGoal';
import type { UserMetaphysic } from './UserMetaphysic';
import type { BlockCalorie } from './BlockCalorie';
import type { FavoriteFood } from './FavoriteFood';
export interface UserMeta {
  id: number;
  dateOfBirth: Date;
  gender: GenderEnum;
  relationship: RelationshipEnum;
  user?: User | null;
  lifeGoal?: BlockTask | null;
  lifeGoalItemId?: number | null;
  /// @prismabox.create.input.hide
  character?: UserCharacter | null;
  characterId?: number | null;
  /// @prismabox.create.input.hide
  calorieGoal?: CalorieGoal | null;
  /// @prismabox.create.input.hide
  metaphysics: UserMetaphysic[];
  /// @prismabox.create.input.hide
  calories: BlockCalorie[];
  /// @prismabox.create.input.hide
  favoriteFoods: FavoriteFood[];
}

export type UserMetaPartial = Partial<UserMeta>;

export type UserMetaCreateInput = Omit<UserMeta, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<UserMeta, 'dateOfBirth' | 'gender' | 'relationship' | 'metaphysics' | 'calories' | 'favoriteFoods'>>;

export type UserMetaUpdateInput = Partial<UserMeta>;
