import type { SystemPreference } from '../Regular/SystemPreference';
export interface AIPreferencePartialRelations {
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
