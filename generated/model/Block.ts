export interface Block {
  id: number;
  name: string;
  description?: string | null;
  type: BlockTypeEnum;
  content?: string | null;
  position?: number | null;
  isTemplate?: boolean | null;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  image?: File | null;
  imageId?: number | null;
  blockTask?: BlockTask | null;
  blockJournal?: BlockJournal | null;
  blockCalorie?: BlockCalorie | null;
  blockRitual?: BlockRitual | null;
  createdByUser: User;
  createdByUserId: number;
  blockFolder?: Folder | null;
  blockFolderId?: number | null;
  parentBlock?: Block | null;
  parentBlockId?: number | null;
  measurements: Measurement[];
  tags: BlockTag[];
  childBlocks: Block[];
  onWorkspaces: Workspace[];
  AITaskSchedules: BlockTask[];
}

export type BlockPartial = Partial<Block>;

export type BlockCreateInput = Omit<Block, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<Block, 'name' | 'type' | 'createdByUser' | 'createdByUserId' | 'measurements' | 'tags' | 'childBlocks' | 'onWorkspaces' | 'AITaskSchedules'>>;

export type BlockUpdateInput = Partial<Block>;
