export interface RitualCategory {
  id: number;
  name: string;
  description?: string | null;
  image?: File | null;
  imageId?: number | null;
  onRituals: BlockRitual[];
  coaches: User[];
  createdAt: Date;
  updatedAt: Date;
}

export type RitualCategoryPartial = Partial<RitualCategory>;

export type RitualCategoryCreateInput = Omit<RitualCategory, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<RitualCategory, 'name' | 'onRituals' | 'coaches'>>;

export type RitualCategoryUpdateInput = Partial<RitualCategory>;
