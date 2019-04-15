import { TestBed } from '@angular/core/testing';

import { GetReadersService } from './get-readers.service';
import { HttpClientModule } from '@angular/common/http'; 

describe('GetReadersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: GetReadersService = TestBed.get(GetReadersService);
    expect(service).toBeTruthy();
  });
});
