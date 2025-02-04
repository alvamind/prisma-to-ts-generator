import type { DecimalJsLike } from '../../helper/helper-types';
import type { User } from '../Regular/User';
import type { Block } from '../Regular/Block';
import type { DynamicAttribute } from '../Regular/DynamicAttribute';
export interface MeasurementPartialRelations {
  id: number;
  mood: DecimalJsLike | null;
  energy: DecimalJsLike | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  userId: number;
  onBlock: Block | null;
  onBlockId: number | null;
  customFields: DynamicAttribute[];
}
