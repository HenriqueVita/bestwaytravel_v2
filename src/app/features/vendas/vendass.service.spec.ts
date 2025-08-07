import { TestBed } from '@angular/core/testing';

import { VendassService } from './vendass.service';
import { describe, beforeEach, it } from 'node:test';

describe('VendassService', () => {
  let service: VendassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
