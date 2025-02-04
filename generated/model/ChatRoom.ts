export interface ChatRoom {
  id: number;
  name: string;
  participants: User[];
  messages: Message[];
}

export type ChatRoomPartial = Partial<ChatRoom>;

export type ChatRoomCreateInput = Omit<ChatRoom, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<ChatRoom, 'name' | 'participants' | 'messages'>>;

export type ChatRoomUpdateInput = Partial<ChatRoom>;
