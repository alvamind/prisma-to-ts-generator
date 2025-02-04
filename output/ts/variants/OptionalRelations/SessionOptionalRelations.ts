import type { User } from '../Regular/User';
export interface SessionOptionalRelations {
  id: string | null;
  token: string | null;
  device: string | null;
  ipAddress: string | null;
  lastActivity: Date | null;
  expiresAt: Date | null;
  user: User | null;
  userId: number | null;
}
