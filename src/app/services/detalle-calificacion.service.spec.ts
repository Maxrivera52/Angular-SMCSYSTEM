import { TestBed } from '@angular/core/testing';

import { DetalleCalificacionService } from './detalle-calificacion.service';

describe('DetalleCalificacionService', () => {
  let service: DetalleCalificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleCalificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
