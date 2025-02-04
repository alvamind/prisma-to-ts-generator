import type { User } from './User';
export interface Session {
  id: string;
  token: string;
  device: string | null;
  ipAddress: string | null;
  lastActivity: Date;
  expiresAt: Date;
  user: User;
  userId: number;
}