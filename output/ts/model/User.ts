import type { Role } from '../enum/Role';
import type { Address } from '../model/Address';
import type { Contact } from '../model/Contact';
export interface User {
  id: number;
  role: Role;
  address: Address;
  contact: Contact;
}
