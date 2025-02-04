import type { JsonValueType } from './helper-types';

export interface PlatformSetting {
  id: number;
  defaultAIAgentSetting: JsonValueType | null;
  createdAt: Date;
  updatedAt: Date;
}