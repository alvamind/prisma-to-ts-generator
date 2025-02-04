import type { User } from '../Regular/User';
import type { Message } from '../Regular/Message';
export interface ChatRoomOptional {
  id: number | null;
  name: string | null;
  participants: User[] | null;
  messages: Message[] | null;
}
