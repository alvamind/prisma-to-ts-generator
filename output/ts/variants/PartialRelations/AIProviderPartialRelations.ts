import type { AIProviderKey } from '../Regular/AIProviderKey';
import type { AIProviderToLLMModel } from '../Regular/AIProviderToLLMModel';
export interface AIProviderPartialRelations {
  id: number;
  name: string;
  baseUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  usageCount: number;
  lastUsed: Date | null;
  keys: AIProviderKey[];
  llmModels: AIProviderToLLMModel[];
}
