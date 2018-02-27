import { Meta } from '@app/shared';

export class Contact {
  type = '';
  value = '';
}

export class Member {
  id: number;
  firstName: string;
  lastName: string;
  contacts: Contact[] = [];
  boardMember: false;
  createdAt: string;
  updatedAt: string;
  meta: Meta = new Meta();
}
