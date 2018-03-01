import { Meta } from '@app/shared';

/** Contact entity */
export class Contact {

  /** Contact type */
  type = '';

  /** Contact value of type */
  value = '';
}

/** Member entity */
export class Member {

  /** Id */
  id: number;

  /** Given name */
  firstName: string;

  /** Surname */
  lastName: string;

  /** Array of {@link Contact} */
  contacts: Contact[] = [];

  /** Whether the member is one of the three board members */
  boardMember: false;

  /** Created timestamp */
  createdAt: string;

  /** Updated timestamp */
  updatedAt: string;

  /** Meta */
  meta: Meta = new Meta();
}
