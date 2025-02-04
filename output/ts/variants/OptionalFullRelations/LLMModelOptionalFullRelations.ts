import type { AIProviderToLLMModel } from '../Regular/AIProviderToLLMModel';
export interface LLMModelOptionalFullRelations {
  id: number | null;
  name: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  aIProvider: AIProviderToLLMModel[] | null;
  isActive: boolean | null;
}
