export interface BlockJournal {
  id: number;
  block: Block;
  blockId: number;
  customFields: DynamicAttribute[];
}

export type BlockJournalPartial = Partial<BlockJournal>;

export type BlockJournalCreateInput = Omit<BlockJournal, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<BlockJournal, 'block' | 'blockId' | 'customFields'>>;

export type BlockJournalUpdateInput = Partial<BlockJournal>;
