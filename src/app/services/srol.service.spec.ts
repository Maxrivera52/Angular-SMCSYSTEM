import { TestBed } from '@angular/core/testing';

import { SRolService } from './srol.service';

describe('SRolService', () => {
  let service: SRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
