import { Meta } from '@app/shared';

export class Contact {
  constructor(public type: string, public value: string) { }
}

export class Member {

  public id: number | string;

  constructor(private _id: number | string, public lastName: string, public firstName: string,
    public contacts: Contact[], public boardMember: boolean, public meta: Meta) {
    this.id = _id;
  }
}
