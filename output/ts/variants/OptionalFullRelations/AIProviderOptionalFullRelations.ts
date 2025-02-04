import type { AIProviderKey } from '../Regular/AIProviderKey';
import type { AIProviderToLLMModel } from '../Regular/AIProviderToLLMModel';
export interface AIProviderOptionalFullRelations {
  id: number | null;
  name: string | null;
  baseUrl: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  isActive: boolean | null;
  usageCount: number | null;
  lastUsed: Date | null;
  keys: AIProviderKey[] | null;
  llmModels: AIProviderToLLMModel[] | null;
}
