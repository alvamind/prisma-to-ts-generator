import type { AIProvider } from './AIProvider';
import type { AIResponseError } from './AIResponseError';
export interface AIProviderKey {
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
