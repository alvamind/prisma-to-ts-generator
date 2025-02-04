export interface AIResponseError {
  id: number;
  // Error message
  error: string;
  // Optional error code from provider
  errorCode?: string | null;
  // HTTP status code if applicable
  httpStatus?: number | null;
  // The request that failed
  requestPayload: string;
  createdAt: Date;
  aIProviderKeyId: number;
  aIProviderKey: AIProviderKey;
  aiResponse?: AIResponse | null;
  aiResponseId?: number | null;
}

export type AIResponseErrorPartial = Partial<AIResponseError>;

export type AIResponseErrorCreateInput = Omit<AIResponseError, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<AIResponseError, 'error' | 'requestPayload' | 'aIProviderKeyId' | 'aIProviderKey'>>;

export type AIResponseErrorUpdateInput = Partial<AIResponseError>;
