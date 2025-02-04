import type { JsonValueType } from '../../helper/helper-types';
import type { MetaPhysicTypeEnum } from '../../enums/MetaPhysicTypeEnum';
import type { UserMeta } from './UserMeta';
export interface UserMetaphysic {
  id: number;
  name: string;
  value: JsonValueType;
  type: MetaPhysicTypeEnum;
  userMeta: UserMeta | null;
  userMetaId: number | null;
}
