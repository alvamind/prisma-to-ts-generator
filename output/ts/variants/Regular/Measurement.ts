import type { DecimalJsLike } from '../../helper/helper-types';
import type { User } from './User';
import type { Block } from './Block';
import type { DynamicAttribute } from './DynamicAttribute';
export interface Measurement {
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
