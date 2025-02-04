import type { User } from '../Regular/User';
import type { AIPreference } from '../Regular/AIPreference';
export interface SystemPreferenceOptionalRelations {
  id: number | null;
  theme: string | null;
  fontSize: number | null;
  fontFamily: string | null;
  colorScheme: string | null;
  soundEnabled: boolean | null;
  notificationsEnabled: boolean | null;
  language: string | null;
  timeFormat: string | null;
  dateFormat: string | null;
  timezone: string | null;
  compactView: boolean | null;
  preferredLanguage: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  user: User | null;
  aiPreference: AIPreference | null;
}
