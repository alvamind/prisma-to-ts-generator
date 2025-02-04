export interface File {
  id: number;
  url: string;
  name: string;
  description?: string | null;
  mimeType: MimeTypeEnum;
  type: FileTypeEnum;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  userImage?: User | null;
  blockImage?: Block | null;
  ritualCategoryImage?: RitualCategory | null;
  blockRitualReference?: BlockRitual | null;
  blockRitualReferenceId?: number | null;
}

export type FilePartial = Partial<File>;

export type FileCreateInput = Omit<File, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<File, 'url' | 'name' | 'mimeType' | 'type' | 'size'>>;

export type FileUpdateInput = Partial<File>;
