import type { DecimalJsLike } from '../../helper/helper-types';
import type { User } from '../Regular/User';
import type { Block } from '../Regular/Block';
import type { DynamicAttribute } from '../Regular/DynamicAttribute';
export interface MeasurementOptionalRelations {
  id: number | null;
  mood: DecimalJsLike | null;
  energy: DecimalJsLike | null;
  notes: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  user: User | null;
  userId: number | null;
  onBlock: Block | null;
  onBlockId: number | null;
  customFields: DynamicAttribute[] | null;
}
