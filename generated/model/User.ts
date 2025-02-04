export interface User {
  id: number;
  name: string;
  email: string;
  /// @prismabox.create.input.hide
  emailVerifiedAt?: Date | null;
  password: string;
  phoneNumber: string;
  /// @prismabox.create.input.hide
  whatsappVerifiedAt?: Date | null;
  /// @prismabox.create.input.hide
  isActive: boolean;
  /// @prismabox.hidden
  lastLoginAt?: Date | null;
  /// @prismabox.create.input.hide
  createdAt: Date;
  /// @prismabox.create.input.hide
  updatedAt?: Date | null;
  /// @prismabox.create.input.hide
  deletedAt?: Date | null;
  /// @prismabox.create.input.hide
  userType: UserTypeEnum;
  profileImage?: File | null;
  profileImageId?: number | null;
  meta: UserMeta;
  metaId: number;
  /// @prismabox.create.input.hide
  systemPref?: SystemPreference | null;
  systemPrefId?: number | null;
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

export type UserPartial = Partial<User>;

export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<User, 'name' | 'email' | 'password' | 'phoneNumber' | 'isActive' | 'userType' | 'meta' | 'metaId' | 'blocksCreated' | 'measurements' | 'sessions' | 'onRituals' | 'onWorkspace' | 'onCategories' | 'onAIResponses' | 'onTimeBlocks' | 'messageSender' | 'onChatRoom'>>;

export type UserUpdateInput = Partial<User>;
