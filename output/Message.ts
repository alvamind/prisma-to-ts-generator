import type { User } from './User';
import type { ChatRoom } from './ChatRoom';
import type { AIResponse } from './AIResponse';
export interface Message {
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