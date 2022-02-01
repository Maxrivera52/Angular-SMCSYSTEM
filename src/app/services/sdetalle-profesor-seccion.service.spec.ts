import { TestBed } from '@angular/core/testing';

import { SdetalleProfesorSeccionService } from './sdetalle-profesor-seccion.service';

describe('SdetalleProfesorSeccionService', () => {
  let service: SdetalleProfesorSeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdetalleProfesorSeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
