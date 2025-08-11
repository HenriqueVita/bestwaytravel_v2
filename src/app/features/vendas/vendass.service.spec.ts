import { TestBed } from '@angular/core/testing';

import { VendasService } from './vendass.service';
import { describe, beforeEach, it } from 'node:test';

describe('VendassService', () => {
  let service: VendasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
