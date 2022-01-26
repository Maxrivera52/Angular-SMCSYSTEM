import { TestBed } from '@angular/core/testing';

import { STareaService } from './starea.service';

describe('STareaService', () => {
  let service: STareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
