import type { User } from '../Regular/User';
export interface SessionPartialRelations {
  id: string;
  token: string;
  device: string | null;
  ipAddress: string | null;
  lastActivity: Date;
  expiresAt: Date;
  user: User;
  userId: number;
}
