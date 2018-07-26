import { TestBed, inject } from '@angular/core/testing';

import { SeccionService } from './seccion.service';

describe('SeccionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeccionService]
    });
  });

  it('should be created', inject([SeccionService], (service: SeccionService) => {
    expect(service).toBeTruthy();
  }));
});
