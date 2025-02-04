import type { AIProviderToLLMModel } from './AIProviderToLLMModel';
export interface LLMModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  aIProvider: AIProviderToLLMModel[];
  isActive: boolean;
}