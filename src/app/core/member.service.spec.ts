import { TestBed, inject } from '@angular/core/testing';

import { MemberService } from './member.service';
import { Logger } from './logger.service';

describe('MemberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MemberService,
        Logger
      ]
    });
  });

  it('should be created', inject([MemberService], (service: MemberService) => {
    expect(service).toBeTruthy();
  }));
});
