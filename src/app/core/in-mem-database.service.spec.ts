import { TestBed, inject } from '@angular/core/testing';

import { InMemoryDatabase } from './in-mem-database.service';

describe('MemberInMemDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDatabase]
    });
  });

  it('[MemberInMemDataService/T001] should be created', inject([InMemoryDatabase], (service: InMemoryDatabase) => {
    expect(service).toBeTruthy();
  }));
});
