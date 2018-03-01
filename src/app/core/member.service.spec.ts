import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { Subscription } from 'rxjs/Subscription';

import { MemberService } from './member.service';
import { Logger } from './logger.service';
import { MemberInMemDataService } from '@app/core/member-in-mem-data.service';
import { Injectable } from '@angular/core';
import { Member, Contact } from '@app/members';

@Injectable()
class NoopLogger {
  log(value: any, ...rest: any[]): void { }
  warn(value: any, ...rest: any[]): void { }
  error(value: any, ...rest: any[]): void { }
}

describe('MemberService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forFeature(MemberInMemDataService),
      ],
      providers: [
        { provide: Logger, useClass: NoopLogger },
        MemberService,
      ]
    });
  });

  it('[MemberService/T001] should be created', inject([MemberService], (service: MemberService) => {
    expect(service).toBeTruthy();
  }));

  it('[MemberService/T002] should get members', async(inject([MemberService], (service: MemberService) => {
    service.findAll()
      .subscribe(members => expect(members.length).toBeGreaterThan(0));
  })));

  it('[MemberService/T003] should get member w/ id=1', async(inject([MemberService], (service: MemberService) => {
    service.find(1).subscribe(member => {
      expect(member).toBeTruthy();
      expect(member.id).toBe(1);
      expect(member.firstName).toBe('Marcella');
    });
  })));

  it('[MemberService/T004] should delete memeber w/ id=1', async(inject([MemberService], (service: MemberService) => {
    service.findAll().subscribe(data => {
      expect(data.length).toEqual(4);
      expect(data[1].firstName).toEqual('Marcella');
    });
    service.delete(1).subscribe();
    service.findAll().subscribe(data => {
      expect(data.length).toEqual(3);
      expect(data[1].firstName).toEqual('Nina');
    });
  })));

  it('[MemberSerivce/T005] should edit member w/ id=1', async(inject([MemberService], (service: MemberService) => {
    service.find(1).subscribe(data => {
      expect(data.firstName).toBe('Marcella');
      data.firstName = 'Erika';
      data.lastName = 'Musterfrau';

      service.update(data).subscribe(() => {
        service.find(1).subscribe(newData => {
          expect(newData.id).toEqual(1);
          expect(newData.firstName).toEqual(data.firstName);
          expect(newData.lastName).toEqual(data.lastName);
        });
      });
    });
  })));

  it('[MemberSerivce/T005] should add member', async(inject([MemberService], (service: MemberService) => {
    service.findAll().subscribe(data => {
      expect(data.length).toEqual(4);

      const member = new Member();
      member.firstName = 'Max';
      member.lastName = 'Musermann';
      member.boardMember = false;
      member.contacts = [
        { type: 'Phone', value: '0123123123' }
      ] as Contact[];

      service.create(member).subscribe(newMember => {
        expect(newMember.firstName).toEqual(member.firstName);
        expect(newMember.lastName).toEqual(member.lastName);
        expect(newMember.boardMember).toEqual(member.boardMember);
        expect(newMember.contacts.length).toEqual(1);
        expect(newMember.contacts[0].type).toEqual(member.contacts[0].type);
        expect(newMember.contacts[0].value).toEqual(member.contacts[0].value);
      });
    });
  })));
});
