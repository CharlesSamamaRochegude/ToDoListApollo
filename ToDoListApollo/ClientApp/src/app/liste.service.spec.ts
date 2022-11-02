import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ListeService } from './liste.service';

describe('ListeService', () => {
  let service: ListeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ListeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
