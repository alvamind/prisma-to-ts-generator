import type { JsonValueType } from '../../helper/helper-types';
import type { MetaPhysicTypeEnum } from '../../enums/MetaPhysicTypeEnum';
import type { UserMeta } from '../Regular/UserMeta';
export interface UserMetaphysicOptional {
  id: number | null;
  name: string | null;
  value: JsonValueType | null;
  type: MetaPhysicTypeEnum | null;
  userMeta: UserMeta | null;
  userMetaId: number | null;
}
