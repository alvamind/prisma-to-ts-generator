import type { AIProviderKey } from './AIProviderKey';
import type { AIResponse } from './AIResponse';
export interface AIResponseError {
  id: number;
  // Error message
  error: string;
  // Optional error code from provider
  errorCode: string | null;
  // HTTP status code if applicable
  httpStatus: number | null;
  // The request that failed
  requestPayload: string;
  createdAt: Date;
  aIProviderKeyId: number;
  aIProviderKey: AIProviderKey;
  aiResponse: AIResponse | null;
  aiResponseId: number | null;
}