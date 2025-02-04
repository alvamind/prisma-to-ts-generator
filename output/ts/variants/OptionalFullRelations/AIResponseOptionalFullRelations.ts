import type { ResponseStatusEnum } from '../../enums/ResponseStatusEnum';
import type { User } from '../Regular/User';
import type { AIResponseError } from '../Regular/AIResponseError';
import type { Message } from '../Regular/Message';
export interface AIResponseOptionalFullRelations {
  id: number | null;
  response: string | null;
  status: ResponseStatusEnum | null;
  responseTime: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  AIUserId: number | null;
  AIUser: User | null;
  errors: AIResponseError[] | null;
  message: Message | null;
}
