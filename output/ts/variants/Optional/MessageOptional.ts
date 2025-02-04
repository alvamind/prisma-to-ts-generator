import type { User } from '../Regular/User';
import type { ChatRoom } from '../Regular/ChatRoom';
import type { AIResponse } from '../Regular/AIResponse';
export interface MessageOptional {
  id: number | null;
  isAIMessage: boolean | null;
  //markdown, Only for human messages
  content: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  sender: User | null;
  senderId: number | null;
  replyTo: Message | null;
  replyToId: number | null;
  chatRoom: ChatRoom | null;
  chatRoomId: number | null;
  aiResponse: AIResponse | null;
  aiResponseId: number | null;
  replies: Message[] | null;
}
