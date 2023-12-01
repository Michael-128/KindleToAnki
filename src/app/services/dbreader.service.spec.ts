import { TestBed } from '@angular/core/testing';

import { DBReaderService } from 'src/app/services/dbreader.service';

describe('DBReaderService', () => {
  let service: DBReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
