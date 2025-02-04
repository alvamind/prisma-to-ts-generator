import type { DecimalJsLike } from '../../helper/helper-types';
import type { AIProvider } from '../Regular/AIProvider';
import type { LLMModel } from '../Regular/LLMModel';
export interface AIProviderToLLMModelPartialRelations {
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
