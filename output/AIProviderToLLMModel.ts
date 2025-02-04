import type { DecimalJsLike } from './helper-types';
import type { AIProvider } from './AIProvider';
import type { LLMModel } from './LLMModel';
export interface AIProviderToLLMModel {
  id: number;
  providerId: number;
  modelId: number;
  createdAt: Date;
  updatedAt: Date;
  inputTokenPrice: DecimalJsLike | null;
  outputTokenPrice: DecimalJsLike | null;
  rpm: number | null;
  rpd: number | null;
  tpm: number | null;
  AIProvider: AIProvider;
  LLMModel: LLMModel;
}