import type { JsonValueType } from '../../helper/helper-types';
export interface PlatformSetting {
  id: number;
  defaultAIAgentSetting: JsonValueType | null;
  createdAt: Date;
  updatedAt: Date;
}
