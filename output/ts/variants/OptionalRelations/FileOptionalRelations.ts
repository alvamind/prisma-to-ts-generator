import type { MimeTypeEnum } from '../../enums/MimeTypeEnum';
import type { FileTypeEnum } from '../../enums/FileTypeEnum';
import type { User } from '../Regular/User';
import type { Block } from '../Regular/Block';
import type { RitualCategory } from '../Regular/RitualCategory';
import type { BlockRitual } from '../Regular/BlockRitual';
export interface FileOptionalRelations {
  id: number | null;
  url: string | null;
  name: string | null;
  description: string | null;
  mimeType: MimeTypeEnum | null;
  type: FileTypeEnum | null;
  size: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  userImage: User | null;
  blockImage: Block | null;
  ritualCategoryImage: RitualCategory | null;
  blockRitualReference: BlockRitual | null;
  blockRitualReferenceId: number | null;
}
