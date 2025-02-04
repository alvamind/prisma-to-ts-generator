import type { File } from '../Regular/File';
import type { BlockRitual } from '../Regular/BlockRitual';
import type { User } from '../Regular/User';
export interface RitualCategoryWithRelations {
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
