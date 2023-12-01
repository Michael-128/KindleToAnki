import { TestBed } from '@angular/core/testing';

import { DictionaryReaderService } from './dictreader.service';

describe('DictreaderService', () => {
  let service: DictionaryReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
