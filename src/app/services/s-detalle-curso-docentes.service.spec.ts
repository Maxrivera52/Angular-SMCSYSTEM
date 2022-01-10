import { TestBed } from '@angular/core/testing';

import { SDetalleCursoDocentesService } from './s-detalle-curso-docentes.service';

describe('SDetalleCursoDocentesService', () => {
  let service: SDetalleCursoDocentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SDetalleCursoDocentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
