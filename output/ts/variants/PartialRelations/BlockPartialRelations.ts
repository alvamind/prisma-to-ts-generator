import type { BlockTypeEnum } from '../../enums/BlockTypeEnum';
import type { File } from '../Regular/File';
import type { BlockTask } from '../Regular/BlockTask';
import type { BlockJournal } from '../Regular/BlockJournal';
import type { BlockCalorie } from '../Regular/BlockCalorie';
import type { BlockRitual } from '../Regular/BlockRitual';
import type { User } from '../Regular/User';
import type { Folder } from '../Regular/Folder';
import type { Measurement } from '../Regular/Measurement';
import type { BlockTag } from '../Regular/BlockTag';
import type { Workspace } from '../Regular/Workspace';
export interface BlockPartialRelations {
  id: number;
  name: string;
  description: string | null;
  type: BlockTypeEnum;
  content: string | null;
  position: number | null;
  isTemplate: boolean | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  image: File | null;
  imageId: number | null;
  blockTask: BlockTask | null;
  blockJournal: BlockJournal | null;
  blockCalorie: BlockCalorie | null;
  blockRitual: BlockRitual | null;
  createdByUser: User;
  createdByUserId: number;
  blockFolder: Folder | null;
  blockFolderId: number | null;
  parentBlock: Block | null;
  parentBlockId: number | null;
  measurements: Measurement[];
  tags: BlockTag[];
  childBlocks: Block[];
  onWorkspaces: Workspace[];
  AITaskSchedules: BlockTask[];
}
