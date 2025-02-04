import type { AIProviderToLLMModel } from '../Regular/AIProviderToLLMModel';
export interface LLMModelWithRelations {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  aIProvider: AIProviderToLLMModel[];
  isActive: boolean;
}
