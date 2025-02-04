import type { JsonValueType } from '../../helper/helper-types';
import type { MetaPhysicTypeEnum } from '../../enums/MetaPhysicTypeEnum';
import type { UserMeta } from '../Regular/UserMeta';
export interface UserMetaphysicPartialRelations {
  id: number;
  name: string;
  value: JsonValueType;
  type: MetaPhysicTypeEnum;
  userMeta: UserMeta | null;
  userMetaId: number | null;
}
