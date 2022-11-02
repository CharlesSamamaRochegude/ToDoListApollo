import { TestBed } from '@angular/core/testing';

import { RechargeurService } from './rechargeur.service';

describe('RechargeurService', () => {
  let service: RechargeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechargeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
