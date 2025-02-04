export interface AIResponse {
  id: number;
  response: string;
  status: ResponseStatusEnum;
  responseTime: number;
  createdAt: Date;
  updatedAt: Date;
  AIUserId: number;
  AIUser: User;
  errors: AIResponseError[];
  message?: Message | null;
}

export type AIResponsePartial = Partial<AIResponse>;

export type AIResponseCreateInput = Omit<AIResponse, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<AIResponse, 'response' | 'status' | 'responseTime' | 'AIUserId' | 'AIUser' | 'errors'>>;

export type AIResponseUpdateInput = Partial<AIResponse>;
