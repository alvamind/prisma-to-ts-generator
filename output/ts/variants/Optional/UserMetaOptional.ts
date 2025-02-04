import type { GenderEnum } from '../../enums/GenderEnum';
import type { RelationshipEnum } from '../../enums/RelationshipEnum';
import type { User } from '../Regular/User';
import type { BlockTask } from '../Regular/BlockTask';
import type { UserCharacter } from '../Regular/UserCharacter';
import type { CalorieGoal } from '../Regular/CalorieGoal';
import type { UserMetaphysic } from '../Regular/UserMetaphysic';
import type { BlockCalorie } from '../Regular/BlockCalorie';
import type { FavoriteFood } from '../Regular/FavoriteFood';
export interface UserMetaOptional {
  id: number | null;
  dateOfBirth: Date | null;
  gender: GenderEnum | null;
  relationship: RelationshipEnum | null;
  user: User | null;
  lifeGoal: BlockTask | null;
  lifeGoalItemId: number | null;
  /// @prismabox.create.input.hide
  character: UserCharacter | null;
  characterId: number | null;
  /// @prismabox.create.input.hide
  calorieGoal: CalorieGoal | null;
  /// @prismabox.create.input.hide
  metaphysics: UserMetaphysic[] | null;
  /// @prismabox.create.input.hide
  calories: BlockCalorie[] | null;
  /// @prismabox.create.input.hide
  favoriteFoods: FavoriteFood[] | null;
}
