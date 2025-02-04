import type { AIProviderToLLMModel } from '../Regular/AIProviderToLLMModel';
export interface LLMModelPartialRelations {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  aIProvider: AIProviderToLLMModel[];
  isActive: boolean;
}
