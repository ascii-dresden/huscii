import { TestBed, inject } from '@angular/core/testing';

import { CashBookService } from './cash-book.service';

describe('CashBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashBookService]
    });
  });

  it('should be created', inject([CashBookService], (service: CashBookService) => {
    expect(service).toBeTruthy();
  }));
});
