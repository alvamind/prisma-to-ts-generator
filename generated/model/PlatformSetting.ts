import type { JsonValueType } from '../helper/helper-types';
export interface PlatformSetting {
  id: number;
  defaultAIAgentSetting?: JsonValueType | null;
  createdAt: Date;
  updatedAt: Date;
}

export type PlatformSettingPartial = Partial<PlatformSetting>;

export type PlatformSettingCreateInput = Omit<PlatformSetting, 'id' | 'createdAt' | 'updatedAt'> ;

export type PlatformSettingUpdateInput = Partial<PlatformSetting>;
