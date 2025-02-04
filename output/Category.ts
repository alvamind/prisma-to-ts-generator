import type { Product } from './Product';
export interface Category {
  id: number;
  name: string;
  products: Product[];
}
