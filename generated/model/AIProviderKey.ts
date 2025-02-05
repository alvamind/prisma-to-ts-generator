import type { AIProvider } from './AIProvider';
import type { AIResponseError } from './AIResponseError';
export interface AIProviderKey {
  id: number;
  providerId: number;
  key: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastHit?: Date | null;
  hitCount: number;
  lastFailed?: Date | null;
  failedCount: number;
  isAvailable: boolean;
  provider: AIProvider;
  errors: AIResponseError[];
}

export type AIProviderKeyPartial = Partial<AIProviderKey>;

export type AIProviderKeyCreateInput = Omit<AIProviderKey, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<AIProviderKey, 'providerId' | 'key' | 'isActive' | 'hitCount' | 'failedCount' | 'isAvailable' | 'provider' | 'errors'>>;

export type AIProviderKeyUpdateInput = Partial<AIProviderKey>;
