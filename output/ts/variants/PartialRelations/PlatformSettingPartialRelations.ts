import type { JsonValueType } from '../../helper/helper-types';
export interface PlatformSettingPartialRelations {
  id: number;
  defaultAIAgentSetting: JsonValueType | null;
  createdAt: Date;
  updatedAt: Date;
}
