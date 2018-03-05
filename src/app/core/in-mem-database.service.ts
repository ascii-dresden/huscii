import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { Member, Contact } from '@app/members';
import { BusinessDay, Unit } from '@app/cash-book';
import { Meta } from '@app/shared';

/** In memory api server. This class is only for develpment purposes. */
@Injectable()
export class InMemoryDatabase implements InMemoryDbService {

  /** Names generated at http://random-name-generator.info/random/ */
  names = [
    'Johnathan Cook',
    'Marcella Barber',
    'Nina Munoz',
    'Henrietta Banks',
  ];

  /**
   * Returns an email address.
   * @param {string} first Members given name
   * @param {string} last Members surname
   * @returns {string} Mock email address
   */
  getEmail(first: string, last: string): string {
    return first.toLowerCase() + '.' + last.toLowerCase() + '@huscii.tld';
  }

  /** Returns a random phone number.
   * @returns {number} Random phone fake phone number
   */
  getPhone(): string {
    return '01' + Math.floor(200000000 + Math.random() * 900000000).toString();
  }

  /**
   * Sums every unit times its own value.
   * @param units Units
   */
  calcPMBalance(...units: Unit[]): number {
    let balance = 0;
    for (const unit of units) {
      balance += unit.amount * unit.value;
    }
    return balance;
  }

  /**
   * Creates an in memory database.
   * @param {RequestInfo} reqInfo Request information
   * @returns {{} | Observable<{}> | Promise<{}>} Either Object, Observable or Promise depending on preffered
   * data processing preferences.
   */
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    let i: number;
    const members: Member[] = [];
    const cashbook: BusinessDay[] = [];

    for (i = 0; i < this.names.length; i++) {
      const firstName = this.names[i].substr(0, this.names[i].indexOf(' '));
      const lastName = this.names[i].substr(this.names[i].indexOf(' ') + 1);
      const member = {
        id: i,
        lastName: lastName,
        firstName: firstName,
        contacts: [
          { type: 'Email', value: this.getEmail(firstName, lastName) },
          { type: 'Phone', value: this.getPhone() }
        ],
        boardMember: false,
        createdAt: '2018-02-24T11:35:00.104Z',
        updatedAt: '2018-02-24T11:35:00.104Z',
        meta: new Meta()
      };

      members.push(member as Member);
    }

    for (i = 0; i < 2000; i++) {
      const now = new Date();
      const hundered = new Unit(10000, Math.floor(Math.random() * 2));
      const fifty = new Unit(5000, Math.floor(Math.random() * 3));
      const twenty = new Unit(2000, Math.floor(Math.random() * 6));
      const ten = new Unit(1000, Math.floor(Math.random() * 6));
      const five = new Unit(500, Math.floor(Math.random() * 6));
      const two = new Unit(200, Math.floor(Math.random() * 21));
      const one = new Unit(100, Math.floor(Math.random() * 21));
      const half = new Unit(50, Math.floor(Math.random() * 21));
      const fifth = new Unit(20, Math.floor(Math.random() * 21));
      const tenth = new Unit(10, Math.floor(Math.random() * 21));
      const twentieth = new Unit(5, Math.floor(Math.random() * 21));
      const fiftieth = new Unit(2, Math.floor(Math.random() * 21));
      const hundredth = new Unit(1, Math.floor(Math.random() * 21));
      const balance = this.calcPMBalance(hundered, fifty, twenty, ten, five, two, one,
        half, fifth, tenth, twentieth, fiftieth, hundredth);

      const day = new BusinessDay();
      day.id = 2000 - i;
      day.date = now.setDate(now.getDate() - i);
      day.balanceAM = 10000;
      day.balancePM = balance,
        day.hundered = hundered;
      day.fifty = fifty;
      day.twenty = twenty;
      day.ten = ten;
      day.five = five;
      day.two = two;
      day.one = one;
      day.half = half;
      day.fifth = fifth;
      day.tenth = tenth;
      day.twentieth = twentieth;
      day.fiftieth = fiftieth;
      day.hundredth = hundredth;

      cashbook.push(day as BusinessDay);
    }


    let returnType = 'object';

    if (reqInfo) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      if (body.clear === true) {
        members.length = 0;
        cashbook.length = 0;
      }

      returnType = body.returnType || 'object';
    }

    const db = { members, cashbook };

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
