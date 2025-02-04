import type { UserTypeEnum } from '../../enums/UserTypeEnum';
import type { File } from './File';
import type { UserMeta } from './UserMeta';
import type { SystemPreference } from './SystemPreference';
import type { Block } from './Block';
import type { Measurement } from './Measurement';
import type { Session } from './Session';
import type { BlockRitual } from './BlockRitual';
import type { Workspace } from './Workspace';
import type { RitualCategory } from './RitualCategory';
import type { AIResponse } from './AIResponse';
import type { TimeBlock } from './TimeBlock';
import type { Message } from './Message';
import type { ChatRoom } from './ChatRoom';
export interface User {
  id: number;
  name: string;
  email: string;
  /// @prismabox.create.input.hide
  emailVerifiedAt: Date | null;
  password: string;
  phoneNumber: string;
  /// @prismabox.create.input.hide
  whatsappVerifiedAt: Date | null;
  /// @prismabox.create.input.hide
  isActive: boolean;
  /// @prismabox.hidden
  lastLoginAt: Date | null;
  /// @prismabox.create.input.hide
  createdAt: Date;
  /// @prismabox.create.input.hide
  updatedAt: Date | null;
  /// @prismabox.create.input.hide
  deletedAt: Date | null;
  /// @prismabox.create.input.hide
  userType: UserTypeEnum;
  profileImage: File | null;
  profileImageId: number | null;
  meta: UserMeta;
  metaId: number;
  /// @prismabox.create.input.hide
  systemPref: SystemPreference | null;
  systemPrefId: number | null;
  /// @prismabox.create.input.hide
  blocksCreated: Block[];
  /// @prismabox.create.input.hide
  measurements: Measurement[];
  /// @prismabox.create.input.hide
  sessions: Session[];
  /// @prismabox.create.input.hide
  onRituals: BlockRitual[];
  /// @prismabox.create.input.hide
  onWorkspace: Workspace[];
  /// @prismabox.create.input.hide
  onCategories: RitualCategory[];
  /// @prismabox.create.input.hide
  onAIResponses: AIResponse[];
  /// @prismabox.create.input.hide
  onTimeBlocks: TimeBlock[];
  /// @prismabox.create.input.hide
  messageSender: Message[];
  /// @prismabox.create.input.hide
  onChatRoom: ChatRoom[];
}
