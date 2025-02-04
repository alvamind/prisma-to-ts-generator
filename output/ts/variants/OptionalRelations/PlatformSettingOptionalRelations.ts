import type { JsonValueType } from '../../helper/helper-types';
export interface PlatformSettingOptionalRelations {
  id: number | null;
  defaultAIAgentSetting: JsonValueType | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
