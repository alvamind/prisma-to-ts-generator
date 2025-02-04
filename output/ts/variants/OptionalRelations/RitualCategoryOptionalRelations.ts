import type { File } from '../Regular/File';
import type { BlockRitual } from '../Regular/BlockRitual';
import type { User } from '../Regular/User';
export interface RitualCategoryOptionalRelations {
  id: number | null;
  name: string | null;
  description: string | null;
  image: File | null;
  imageId: number | null;
  onRituals: BlockRitual[] | null;
  coaches: User[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
