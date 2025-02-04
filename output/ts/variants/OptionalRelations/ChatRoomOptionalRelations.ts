import type { User } from '../Regular/User';
import type { Message } from '../Regular/Message';
export interface ChatRoomOptionalRelations {
  id: number | null;
  name: string | null;
  participants: User[] | null;
  messages: Message[] | null;
}
