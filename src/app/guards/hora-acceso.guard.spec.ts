import { TestBed } from '@angular/core/testing';

import { HoraAccesoGuard } from './hora-acceso.guard';

describe('HoraAccesoGuard', () => {
  let guard: HoraAccesoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HoraAccesoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
