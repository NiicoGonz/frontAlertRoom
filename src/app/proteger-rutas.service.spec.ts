import { TestBed } from '@angular/core/testing';

import { ProtegerRutasService } from './proteger-rutas.service';

describe('ProtegerRutasService', () => {
  let service: ProtegerRutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtegerRutasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
