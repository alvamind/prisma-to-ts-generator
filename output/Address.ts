import type { Coordinate } from './Coordinate';
export interface Address {
  street: string;
  city: string;
  coordinates: Coordinate;
}
