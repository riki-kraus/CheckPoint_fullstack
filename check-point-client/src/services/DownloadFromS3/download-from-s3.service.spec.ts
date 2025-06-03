import { TestBed } from '@angular/core/testing';

import { DownloadFromS3Service } from './download-from-s3.service';

describe('DownloadFromS3Service', () => {
  let service: DownloadFromS3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadFromS3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
