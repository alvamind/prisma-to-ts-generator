import type { ResponseStatusEnum } from '../../enums/ResponseStatusEnum';
import type { User } from '../Regular/User';
import type { AIResponseError } from '../Regular/AIResponseError';
import type { Message } from '../Regular/Message';
export interface AIResponseWithRelations {
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
