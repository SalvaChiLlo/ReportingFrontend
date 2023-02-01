import { TestBed } from '@angular/core/testing';

import { ReportingAPIService } from './reporting-api.service';

describe('ReportingAPIService', () => {
  let service: ReportingAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportingAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
