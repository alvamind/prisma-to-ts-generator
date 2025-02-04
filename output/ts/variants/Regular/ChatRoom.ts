import type { User } from './User';
import type { Message } from './Message';
export interface ChatRoom {
  id: number;
  name: string;
  participants: User[];
  messages: Message[];
}
