import type { WorkspaceTypeEnum } from '../../enums/WorkspaceTypeEnum';
import type { Folder } from '../Regular/Folder';
import type { BlockTaskStatus } from '../Regular/BlockTaskStatus';
import type { Block } from '../Regular/Block';
import type { DynamicAttribute } from '../Regular/DynamicAttribute';
import type { DynamicAttributeGroup } from '../Regular/DynamicAttributeGroup';
import type { User } from '../Regular/User';
export interface WorkspacePartialRelations {
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
