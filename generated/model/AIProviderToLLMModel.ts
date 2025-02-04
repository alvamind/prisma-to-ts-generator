export interface AIProviderToLLMModel {
  id: number;
  providerId: number;
  modelId: number;
  createdAt: Date;
  updatedAt: Date;
  inputTokenPrice?: DecimalJsLike | null;
  outputTokenPrice?: DecimalJsLike | null;
  rpm?: number | null;
  rpd?: number | null;
  tpm?: number | null;
  AIProvider: AIProvider;
  LLMModel: LLMModel;
}

export type AIProviderToLLMModelPartial = Partial<AIProviderToLLMModel>;

export type AIProviderToLLMModelCreateInput = Omit<AIProviderToLLMModel, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<AIProviderToLLMModel, 'providerId' | 'modelId' | 'AIProvider' | 'LLMModel'>>;

export type AIProviderToLLMModelUpdateInput = Partial<AIProviderToLLMModel>;
