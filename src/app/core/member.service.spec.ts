import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { Subscription } from 'rxjs/Subscription';

import { MemberService } from './member.service';
import { Logger } from './logger.service';
import { MemberInMemDataService } from '@app/core/member-in-mem-data.service';
import { Injectable } from '@angular/core';

@Injectable()
class NoopLogger {
  log(value: any, ...rest: any[]): void { }
  warn(value: any, ...rest: any[]): void { }
  error(value: any, ...rest: any[]): void { }
}

describe('MemberService', () => {
  let memberService: MemberService;

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
    TestBed.compileComponents();

    memberService = TestBed.get(MemberService);
  });

  it('[MemberService/T001] should be created', () => {
    expect(memberService).toBeTruthy();
  });

  it('[MemberService/T002] should get members', async(() => {
    memberService.findAll()
      .subscribe(members => expect(members.length).toBeGreaterThan(0));
  }));

  it('[MemberService/T003] should get member w/ id=1', async(() => {
    memberService.find(1).subscribe(member => {
      expect(member).toBeTruthy();
      expect(member.id).toBe(1);
      expect(member.firstName).toBe('Marcella');
    });
  }));

  it('[MemberService/T004] should delete memeber w/ id=1', async(() => {
    memberService.findAll().subscribe(data => {
      expect(data.length).toEqual(4);
      expect(data[1].firstName).toEqual('Marcella');
    });
    memberService.delete(1).subscribe();
    memberService.findAll().subscribe(data => {
      expect(data.length).toEqual(3);
      expect(data[1].firstName).toEqual('Nina');
    });
  }));

  it('[MemberSerivce/T005] should edit member w/ id=1', async(() => {
    memberService.find(1).subscribe(data => {
      expect(data.firstName).toBe('Marcella');
      data.firstName = 'Erika';
      data.lastName = 'Mustermann';
      memberService.update(data).subscribe();
    });
    memberService.find(1).subscribe(data => {
      expect(data.id).toEqual(1);
      expect(data.firstName).toEqual('Erika');
      expect(data.lastName).toEqual('Musterfrau');
    });
  }));
});
