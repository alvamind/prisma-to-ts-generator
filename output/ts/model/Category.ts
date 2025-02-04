import type { Product } from '../model/Product';
export interface Category {
  id: number;
  name: string;
  products: Product[];
}
