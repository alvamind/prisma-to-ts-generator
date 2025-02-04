import type { SystemPreference } from '../Regular/SystemPreference';
export interface AIPreferenceOptionalRelations {
  id: number | null;
  civilLevel: number | null;
  conversationStyle: string | null;
  contextLengthLevel: number | null;
  vocabularyLevel: number | null;
  humorLevel: number | null;
  empathyLevel: number | null;
  formalityLevel: number | null;
  creativityLevel: number | null;
  proactiveLevel: number | null;
  systemPreference: SystemPreference | null;
  systemPreferenceId: number | null;
}
