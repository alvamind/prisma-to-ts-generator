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
  user?: User | null;
  aiPreference?: AIPreference | null;
}

export type SystemPreferencePartial = Partial<SystemPreference>;

export type SystemPreferenceCreateInput = Omit<SystemPreference, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<SystemPreference, 'theme' | 'fontSize' | 'fontFamily' | 'colorScheme' | 'soundEnabled' | 'notificationsEnabled' | 'language' | 'timeFormat' | 'dateFormat' | 'timezone' | 'compactView' | 'preferredLanguage'>>;

export type SystemPreferenceUpdateInput = Partial<SystemPreference>;
