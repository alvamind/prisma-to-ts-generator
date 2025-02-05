import type { User } from './User';
export interface Session {
  id: string;
  token: string;
  device?: string | null;
  ipAddress?: string | null;
  lastActivity: Date;
  expiresAt: Date;
  user: User;
  userId: number;
}

export type SessionPartial = Partial<Session>;

export type SessionCreateInput = Omit<Session, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<Session, 'token' | 'lastActivity' | 'expiresAt' | 'user' | 'userId'>>;

export type SessionUpdateInput = Partial<Session>;
