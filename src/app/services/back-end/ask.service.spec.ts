import { TestBed, inject } from '@angular/core/testing';

import { AskService } from './ask.service';

describe('AskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AskService]
    });
  });

  it('should be created', inject([AskService], (service: AskService) => {
    expect(service).toBeTruthy();
  }));
});
