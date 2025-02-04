export interface Measurement {
  id: number;
  mood?: DecimalJsLike | null;
  energy?: DecimalJsLike | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  userId: number;
  onBlock?: Block | null;
  onBlockId?: number | null;
  customFields: DynamicAttribute[];
}

export type MeasurementPartial = Partial<Measurement>;

export type MeasurementCreateInput = Omit<Measurement, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<Measurement, 'user' | 'userId' | 'customFields'>>;

export type MeasurementUpdateInput = Partial<Measurement>;
