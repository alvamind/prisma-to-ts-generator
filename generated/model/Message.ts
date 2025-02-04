export interface Message {
  id: number;
  isAIMessage: boolean;
  //markdown, Only for human messages
  content?: string | null;
  createdAt: Date;
  updatedAt: Date;
  sender: User;
  senderId: number;
  replyTo?: Message | null;
  replyToId?: number | null;
  chatRoom?: ChatRoom | null;
  chatRoomId?: number | null;
  aiResponse?: AIResponse | null;
  aiResponseId?: number | null;
  replies: Message[];
}

export type MessagePartial = Partial<Message>;

export type MessageCreateInput = Omit<Message, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<Message, 'isAIMessage' | 'sender' | 'senderId' | 'replies'>>;

export type MessageUpdateInput = Partial<Message>;
