import type { User } from '../Regular/User';
import type { Message } from '../Regular/Message';
export interface ChatRoomWithRelations {
  id: number;
  name: string;
  participants: User[];
  messages: Message[];
}
