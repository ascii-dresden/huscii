import { Meta } from '@app/shared';

export class Contact {
  type: string;
  value: string;
}

export class Member {
  id: number;
  firstName: string;
  lastName: string;
  contacts: Contact[];
  boardMember: false;
  createdAt: string;
  updatedAt: string;
  meta: Meta;
}
