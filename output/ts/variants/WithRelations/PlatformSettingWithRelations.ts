import type { JsonValueType } from '../../helper/helper-types';
export interface PlatformSettingWithRelations {
  id: number;
  defaultAIAgentSetting: JsonValueType | null;
  createdAt: Date;
  updatedAt: Date;
}
