import { TestBed } from '@angular/core/testing';

import { LinhasOnibusService } from './linhas-onibus.service';

describe('LinhasOnibusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinhasOnibusService = TestBed.get(LinhasOnibusService);
    expect(service).toBeTruthy();
  });
});
