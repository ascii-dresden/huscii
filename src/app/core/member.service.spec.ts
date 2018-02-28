import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { Subscription } from 'rxjs/Subscription';

import { MemberService } from './member.service';
import { Logger } from './logger.service';
import { MemberInMemDataService } from '@app/core/member-in-mem-data.service';

describe('MemberService', () => {
  let memberService: MemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forFeature(MemberInMemDataService),
      ],
      providers: [
        Logger,
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
});
