import { TestBed, inject } from '@angular/core/testing';

import { MemberInMemDataService } from './member-in-mem-data.service';

describe('MemberInMemDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberInMemDataService]
    });
  });

  it('[MemberInMemDataService/T001] should be created', inject([MemberInMemDataService], (service: MemberInMemDataService) => {
    expect(service).toBeTruthy();
  }));
});
