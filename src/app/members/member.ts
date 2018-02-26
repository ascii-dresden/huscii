import { Meta } from '@app/shared';

export class Contact {
  type = '';
  value = '';
}

/*export class Member {

  public id: number | string;

  constructor(private _id: number | string, public lastName: string, public firstName: string, public contacts: Contact[],
    public boardMember: boolean, public createdAt: string, public updatedAt: string, public meta: Meta) {
    this.id = _id;
  }
}*/

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
