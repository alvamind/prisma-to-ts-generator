import type { User } from '../Regular/User';
import type { AIPreference } from '../Regular/AIPreference';
export interface SystemPreferencePartialRelations {
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
