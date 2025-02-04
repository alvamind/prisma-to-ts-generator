export interface AIProvider {
  id: number;
  name: string;
  baseUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  usageCount: number;
  lastUsed?: Date | null;
  keys: AIProviderKey[];
  llmModels: AIProviderToLLMModel[];
}

export type AIProviderPartial = Partial<AIProvider>;

export type AIProviderCreateInput = Omit<AIProvider, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<AIProvider, 'name' | 'baseUrl' | 'isActive' | 'usageCount' | 'keys' | 'llmModels'>>;

export type AIProviderUpdateInput = Partial<AIProvider>;
