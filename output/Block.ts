import type { BlockTypeEnum } from './BlockTypeEnum';
import type { File } from './File';
import type { BlockTask } from './BlockTask';
import type { BlockJournal } from './BlockJournal';
import type { BlockCalorie } from './BlockCalorie';
import type { BlockRitual } from './BlockRitual';
import type { User } from './User';
import type { Folder } from './Folder';
import type { Measurement } from './Measurement';
import type { BlockTag } from './BlockTag';
import type { Workspace } from './Workspace';
export interface Block {
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