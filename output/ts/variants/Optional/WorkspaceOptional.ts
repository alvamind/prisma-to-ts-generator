import type { WorkspaceTypeEnum } from '../../enums/WorkspaceTypeEnum';
import type { Folder } from '../Regular/Folder';
import type { BlockTaskStatus } from '../Regular/BlockTaskStatus';
import type { Block } from '../Regular/Block';
import type { DynamicAttribute } from '../Regular/DynamicAttribute';
import type { DynamicAttributeGroup } from '../Regular/DynamicAttributeGroup';
import type { User } from '../Regular/User';
export interface WorkspaceOptional {
  id: number | null;
  name: string | null;
  type: WorkspaceTypeEnum | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  folders: Folder[] | null;
  onBlockTaskStatus: BlockTaskStatus[] | null;
  onBlock: Block[] | null;
  onDynamicAttributes: DynamicAttribute[] | null;
  onDynamicAttributeGroups: DynamicAttributeGroup[] | null;
  onUser: User[] | null;
}
