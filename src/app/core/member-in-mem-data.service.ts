import { Injectable } from '@angular/core';

import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { Member, Contact } from '@app/members';
import { Meta } from '@app/shared';

// Names generated at http://random-name-generator.info/random/
const names = [
  'Johnathan Cook',
  'Marcella Barber',
  'Nina Munoz',
  'Henrietta Banks',
];

@Injectable()
export class MemberInMemDataService implements InMemoryDbService {

  getEmail(first: string, last: string): string {
    return first.toLowerCase() + '.' + last.toLowerCase() + '@huscii.tld';
  }

  getPhone(): string {
    return '01' + Math.floor(200000000 + Math.random() * 900000000).toString();
  }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    let i: number;
    const members: Member[] = [];

    for (i = 0; i < names.length; i++) {
      const firstName = names[i].substr(0, names[i].indexOf(' '));
      const lastName = names[i].substr(names[i].indexOf(' ') + 1);
      const member = new Member(
        i,
        lastName,
        firstName,
        [
          new Contact('email', this.getEmail(firstName, lastName)),
          new Contact('phone', this.getPhone())
        ],
        false,
        '2018-02-24T11:35:00.104Z',
        '2018-02-24T11:35:00.104Z',
        new Meta(false)
      );

      members.push(member);
    }

    let returnType = 'object';

    if (reqInfo) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      if (body.clear === true) {
        members.length = 0;
      }

      returnType = body.returnType || 'object';
    }

    const db = { members };

    switch (returnType) {
      case ('observable'):
        return of(db).delay(10);
      case ('promise'):
        return new Promise(resolve => {
          setTimeout(() => resolve(db), 10);
        });
      default:
        return db;
    }
  }
}
