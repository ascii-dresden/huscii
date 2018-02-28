import { TestBed, inject } from '@angular/core/testing';

import { EmitterService } from './emitter.service';

describe('EmitterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmitterService]
    });
  });

  it('[EmitterService/T001] should be created', inject([EmitterService], (service: EmitterService) => {
    expect(service).toBeTruthy();
  }));
});
