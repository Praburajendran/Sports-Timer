import { TestBed } from '@angular/core/testing';

import { GetReadersService } from './get-readers.service';

describe('GetReadersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetReadersService = TestBed.get(GetReadersService);
    expect(service).toBeTruthy();
  });
});
