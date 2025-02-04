import type { DecimalJsLike } from '../../helper/helper-types';
import type { AIProvider } from '../Regular/AIProvider';
import type { LLMModel } from '../Regular/LLMModel';
export interface AIProviderToLLMModelOptional {
  id: number | null;
  providerId: number | null;
  modelId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  inputTokenPrice: DecimalJsLike | null;
  outputTokenPrice: DecimalJsLike | null;
  rpm: number | null;
  rpd: number | null;
  tpm: number | null;
  AIProvider: AIProvider | null;
  LLMModel: LLMModel | null;
}
