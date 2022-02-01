import { TestBed } from '@angular/core/testing';

import { SCalificacionService } from './scalificacion.service';

describe('SCalificacionService', () => {
  let service: SCalificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SCalificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
