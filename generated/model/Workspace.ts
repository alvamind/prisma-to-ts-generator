export interface Workspace {
  id: number;
  name: string;
  type: WorkspaceTypeEnum;
  createdAt: Date;
  updatedAt: Date;
  folders: Folder[];
  onBlockTaskStatus: BlockTaskStatus[];
  onBlock: Block[];
  onDynamicAttributes: DynamicAttribute[];
  onDynamicAttributeGroups: DynamicAttributeGroup[];
  onUser: User[];
}

export type WorkspacePartial = Partial<Workspace>;

export type WorkspaceCreateInput = Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<Workspace, 'name' | 'type' | 'folders' | 'onBlockTaskStatus' | 'onBlock' | 'onDynamicAttributes' | 'onDynamicAttributeGroups' | 'onUser'>>;

export type WorkspaceUpdateInput = Partial<Workspace>;
