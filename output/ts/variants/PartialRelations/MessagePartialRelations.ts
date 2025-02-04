import type { User } from '../Regular/User';
import type { ChatRoom } from '../Regular/ChatRoom';
import type { AIResponse } from '../Regular/AIResponse';
export interface MessagePartialRelations {
  id: number;
  isAIMessage: boolean;
  //markdown, Only for human messages
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  sender: User;
  senderId: number;
  replyTo: Message | null;
  replyToId: number | null;
  chatRoom: ChatRoom | null;
  chatRoomId: number | null;
  aiResponse: AIResponse | null;
  aiResponseId: number | null;
  replies: Message[];
}
