import { TestBed } from '@angular/core/testing';

import { Registration.ServiceService } from './registration.service.service';

describe('Registration.ServiceService', () => {
  let service: Registration.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Registration.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
