export interface LLMModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  aIProvider: AIProviderToLLMModel[];
  isActive: boolean;
}

export type LLMModelPartial = Partial<LLMModel>;

export type LLMModelCreateInput = Omit<LLMModel, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<LLMModel, 'name' | 'aIProvider' | 'isActive'>>;

export type LLMModelUpdateInput = Partial<LLMModel>;
