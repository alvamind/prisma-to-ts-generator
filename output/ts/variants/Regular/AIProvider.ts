import type { AIProviderKey } from './AIProviderKey';
import type { AIProviderToLLMModel } from './AIProviderToLLMModel';
export interface AIProvider {
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
