import type { UserTypeEnum } from '../../enums/UserTypeEnum';
import type { File } from '../Regular/File';
import type { UserMeta } from '../Regular/UserMeta';
import type { SystemPreference } from '../Regular/SystemPreference';
import type { Block } from '../Regular/Block';
import type { Measurement } from '../Regular/Measurement';
import type { Session } from '../Regular/Session';
import type { BlockRitual } from '../Regular/BlockRitual';
import type { Workspace } from '../Regular/Workspace';
import type { RitualCategory } from '../Regular/RitualCategory';
import type { AIResponse } from '../Regular/AIResponse';
import type { TimeBlock } from '../Regular/TimeBlock';
import type { Message } from '../Regular/Message';
import type { ChatRoom } from '../Regular/ChatRoom';
export interface UserOptionalRelations {
  id: number | null;
  name: string | null;
  email: string | null;
  /// @prismabox.create.input.hide
  emailVerifiedAt: Date | null;
  password: string | null;
  phoneNumber: string | null;
  /// @prismabox.create.input.hide
  whatsappVerifiedAt: Date | null;
  /// @prismabox.create.input.hide
  isActive: boolean | null;
  /// @prismabox.hidden
  lastLoginAt: Date | null;
  /// @prismabox.create.input.hide
  createdAt: Date | null;
  /// @prismabox.create.input.hide
  updatedAt: Date | null;
  /// @prismabox.create.input.hide
  deletedAt: Date | null;
  /// @prismabox.create.input.hide
  userType: UserTypeEnum | null;
  profileImage: File | null;
  profileImageId: number | null;
  meta: UserMeta | null;
  metaId: number | null;
  /// @prismabox.create.input.hide
  systemPref: SystemPreference | null;
  systemPrefId: number | null;
  /// @prismabox.create.input.hide
  blocksCreated: Block[] | null;
  /// @prismabox.create.input.hide
  measurements: Measurement[] | null;
  /// @prismabox.create.input.hide
  sessions: Session[] | null;
  /// @prismabox.create.input.hide
  onRituals: BlockRitual[] | null;
  /// @prismabox.create.input.hide
  onWorkspace: Workspace[] | null;
  /// @prismabox.create.input.hide
  onCategories: RitualCategory[] | null;
  /// @prismabox.create.input.hide
  onAIResponses: AIResponse[] | null;
  /// @prismabox.create.input.hide
  onTimeBlocks: TimeBlock[] | null;
  /// @prismabox.create.input.hide
  messageSender: Message[] | null;
  /// @prismabox.create.input.hide
  onChatRoom: ChatRoom[] | null;
}
