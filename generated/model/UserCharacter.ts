export interface UserCharacter {
  id: number;
  mbti: string;
  enneagram: string;
  bigFiveScores: JsonValueType;
  archetype: string;
  personalityTraits: JsonValueType;
  values: string[];
  interests: string[];
  skills: string[];
  fears: string[];
  motivations: string[];
  habits: string[];
  relationships: string[];
  backstory: string;
  occupation: string;
  education: string;
  learningStyle: string;
  cognitiveStyle: string;
  creativityIndex: number;
  problemSolvingStyle: string;
  communicationStyle: string;
  socialStyle: string;
  languageStyle: string;
  emotionalPatterns: string[];
  emotionalIntelligence: number;
  empathyLevel: number;
  selfAwareness: number;
  adaptabilityScore: number;
  resilienceLevel: number;
  copingMechanisms: string[];
  stressResponse: string;
  stressManagementLevel: number;
  workStyle: string;
  leadershipStyle: string;
  decisionMakingStyle: string;
  conflictStyle: string;
  culturalBackground?: string | null;
  lifeExperiences: string[];
  beliefs: string[];
  growthMindset: number;
  userMeta?: UserMeta | null;
}

export type UserCharacterPartial = Partial<UserCharacter>;

export type UserCharacterCreateInput = Omit<UserCharacter, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<UserCharacter, 'mbti' | 'enneagram' | 'bigFiveScores' | 'archetype' | 'personalityTraits' | 'values' | 'interests' | 'skills' | 'fears' | 'motivations' | 'habits' | 'relationships' | 'backstory' | 'occupation' | 'education' | 'learningStyle' | 'cognitiveStyle' | 'creativityIndex' | 'problemSolvingStyle' | 'communicationStyle' | 'socialStyle' | 'languageStyle' | 'emotionalPatterns' | 'emotionalIntelligence' | 'empathyLevel' | 'selfAwareness' | 'adaptabilityScore' | 'resilienceLevel' | 'copingMechanisms' | 'stressResponse' | 'stressManagementLevel' | 'workStyle' | 'leadershipStyle' | 'decisionMakingStyle' | 'conflictStyle' | 'lifeExperiences' | 'beliefs' | 'growthMindset'>>;

export type UserCharacterUpdateInput = Partial<UserCharacter>;
