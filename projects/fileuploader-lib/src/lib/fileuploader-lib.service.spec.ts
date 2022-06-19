import { TestBed } from '@angular/core/testing';

import { FileuploaderLibService } from './fileuploader-lib.service';

describe('FileuploaderLibService', () => {
  let service: FileuploaderLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileuploaderLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
