import { Identifiable } from '@app/core';

import { Meta } from '@app/shared';

export class Contact {
  constructor(public type: string, public value: string) { }
}

export class Member implements Identifiable {

  public fullName: string;

  constructor(private _id: number, public lastName: string, public firstName: string,
    public contacts: Contact[], public boardMember: boolean, public meta: Meta) {
    this.fullName = firstName + ' ' + lastName;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }
}
