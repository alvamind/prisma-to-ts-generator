import type { MimeTypeEnum } from './MimeTypeEnum';
import type { FileTypeEnum } from './FileTypeEnum';
import type { User } from './User';
import type { Block } from './Block';
import type { RitualCategory } from './RitualCategory';
import type { BlockRitual } from './BlockRitual';
export interface File {
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