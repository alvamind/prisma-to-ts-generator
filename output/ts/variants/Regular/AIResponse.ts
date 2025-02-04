import type { ResponseStatusEnum } from '../../enums/ResponseStatusEnum';
import type { User } from './User';
import type { AIResponseError } from './AIResponseError';
import type { Message } from './Message';
export interface AIResponse {
  id: number;
  response: string;
  status: ResponseStatusEnum;
  responseTime: number;
  createdAt: Date;
  updatedAt: Date;
  AIUserId: number;
  AIUser: User;
  errors: AIResponseError[];
  message: Message | null;
}
