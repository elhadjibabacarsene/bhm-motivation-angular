import { TestBed } from '@angular/core/testing';

import { FeatureFlagsServiceService } from './feature-flags.service';

describe('FeatureFlagsServiceService', () => {
  let service: FeatureFlagsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureFlagsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
