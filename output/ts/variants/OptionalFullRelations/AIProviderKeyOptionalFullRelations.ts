import type { AIProvider } from '../Regular/AIProvider';
import type { AIResponseError } from '../Regular/AIResponseError';
export interface AIProviderKeyOptionalFullRelations {
  id: number | null;
  providerId: number | null;
  key: string | null;
  isActive: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  lastHit: Date | null;
  hitCount: number | null;
  lastFailed: Date | null;
  failedCount: number | null;
  isAvailable: boolean | null;
  provider: AIProvider | null;
  errors: AIResponseError[] | null;
}
