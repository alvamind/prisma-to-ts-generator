import type { User } from './User';
import type { AIPreference } from './AIPreference';
export interface SystemPreference {
  id: number;
  theme: string;
  fontSize: number;
  fontFamily: string;
  colorScheme: string;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  language: string;
  timeFormat: string;
  dateFormat: string;
  timezone: string;
  compactView: boolean;
  preferredLanguage: string;
  createdAt: Date;
  updatedAt: Date;
  user: User | null;
  aiPreference: AIPreference | null;
}
