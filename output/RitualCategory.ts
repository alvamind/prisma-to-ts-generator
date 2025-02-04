import type { File } from './File';
import type { BlockRitual } from './BlockRitual';
import type { User } from './User';
export interface RitualCategory {
  id: number;
  name: string;
  description: string | null;
  image: File | null;
  imageId: number | null;
  onRituals: BlockRitual[];
  coaches: User[];
  createdAt: Date;
  updatedAt: Date;
}