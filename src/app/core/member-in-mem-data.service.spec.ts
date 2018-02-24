import { TestBed, inject } from '@angular/core/testing';

import { MemberInMemDataService } from './member-in-mem-data.service';

describe('MemberInMemDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberInMemDataService]
    });
  });

  it('should be created', inject([MemberInMemDataService], (service: MemberInMemDataService) => {
    expect(service).toBeTruthy();
  }));
});
