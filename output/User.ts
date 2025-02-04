import type { Role } from './Role';
import type { Address } from './Address';
import type { Contact } from './Contact';
export interface User {
  id: number;
  role: Role;
  address: Address;
  contact: Contact;
}