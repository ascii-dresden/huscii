import { Meta } from '@app/shared';

export class Contact {
  constructor(public type: string, public value: string) {
    if (type === 'email') {
      type = 'envelope';
    }
  }
}

export class Member {

  public id: number | string;

  constructor(private _id: number | string, public lastName: string, public firstName: string, public contacts: Contact[],
    public boardMember: boolean, public createdAt: string, public updatedAt: string, public meta: Meta) {
    this.id = _id;
  }
}
