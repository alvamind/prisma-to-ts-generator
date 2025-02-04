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

export type AIPreferencePartial = Partial<AIPreference>;

export type AIPreferenceCreateInput = Omit<AIPreference, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<AIPreference, 'civilLevel' | 'conversationStyle' | 'contextLengthLevel' | 'vocabularyLevel' | 'humorLevel' | 'empathyLevel' | 'formalityLevel' | 'creativityLevel' | 'proactiveLevel' | 'systemPreference' | 'systemPreferenceId'>>;

export type AIPreferenceUpdateInput = Partial<AIPreference>;
