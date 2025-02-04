import type { Category } from '../model/Category';
export interface Product {
  id: number;
  name: string;
  category: Category;
  categoryId: number;
}
