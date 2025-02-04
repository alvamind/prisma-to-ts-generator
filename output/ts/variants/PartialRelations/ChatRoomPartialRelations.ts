import type { User } from '../Regular/User';
import type { Message } from '../Regular/Message';
export interface ChatRoomPartialRelations {
  id: number;
  name: string;
  participants: User[];
  messages: Message[];
}
