import type { SystemPreference } from './SystemPreference';
export interface AIPreference {
  id: number;
  civilLevel: number;
  conversationStyle: string;
  contextLengthLevel: number;
  vocabularyLevel: number;
  humorLevel: number;
  empathyLevel: number;
  formalityLevel: number;
  creativityLevel: number;
  proactiveLevel: number;
  systemPreference: SystemPreference;
  systemPreferenceId: number;
}
