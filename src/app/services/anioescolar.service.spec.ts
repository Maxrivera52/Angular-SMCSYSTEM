import { TestBed } from '@angular/core/testing';

import { AnioescolarService } from './anioescolar.service';

describe('AnioescolarService', () => {
  let service: AnioescolarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnioescolarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
