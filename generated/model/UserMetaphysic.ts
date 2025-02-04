export interface UserMetaphysic {
  id: number;
  name: string;
  value: JsonValueType;
  type: MetaPhysicTypeEnum;
  userMeta?: UserMeta | null;
  userMetaId?: number | null;
}

export type UserMetaphysicPartial = Partial<UserMetaphysic>;

export type UserMetaphysicCreateInput = Omit<UserMetaphysic, 'id' | 'createdAt' | 'updatedAt'> & Required<Pick<UserMetaphysic, 'name' | 'value' | 'type'>>;

export type UserMetaphysicUpdateInput = Partial<UserMetaphysic>;
