import type { MimeTypeEnum } from '../../enums/MimeTypeEnum';
import type { FileTypeEnum } from '../../enums/FileTypeEnum';
import type { User } from '../Regular/User';
import type { Block } from '../Regular/Block';
import type { RitualCategory } from '../Regular/RitualCategory';
import type { BlockRitual } from '../Regular/BlockRitual';
export interface FilePartialRelations {
  id: number;
  url: string;
  name: string;
  description: string | null;
  mimeType: MimeTypeEnum;
  type: FileTypeEnum;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  userImage: User | null;
  blockImage: Block | null;
  ritualCategoryImage: RitualCategory | null;
  blockRitualReference: BlockRitual | null;
  blockRitualReferenceId: number | null;
}
