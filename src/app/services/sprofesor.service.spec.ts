import { TestBed } from '@angular/core/testing';

import { SprofesorService } from './sprofesor.service';

describe('SprofesorService', () => {
  let service: SprofesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprofesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
