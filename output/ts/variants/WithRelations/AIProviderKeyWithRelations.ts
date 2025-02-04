import type { AIProvider } from '../Regular/AIProvider';
import type { AIResponseError } from '../Regular/AIResponseError';
export interface AIProviderKeyWithRelations {
  id: number;
  providerId: number;
  key: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastHit: Date | null;
  hitCount: number;
  lastFailed: Date | null;
  failedCount: number;
  isAvailable: boolean;
  provider: AIProvider;
  errors: AIResponseError[];
}
