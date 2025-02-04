import type { AIProviderKey } from '../Regular/AIProviderKey';
import type { AIResponse } from '../Regular/AIResponse';
export interface AIResponseErrorOptional {
  id: number | null;
  // Error message
  error: string | null;
  // Optional error code from provider
  errorCode: string | null;
  // HTTP status code if applicable
  httpStatus: number | null;
  // The request that failed
  requestPayload: string | null;
  createdAt: Date | null;
  aIProviderKeyId: number | null;
  aIProviderKey: AIProviderKey | null;
  aiResponse: AIResponse | null;
  aiResponseId: number | null;
}
