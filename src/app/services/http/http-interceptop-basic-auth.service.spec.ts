import { TestBed } from '@angular/core/testing';

import { HttpInterceptopBasicAuthService } from './http-interceptop-basic-auth.service';

describe('HttpInterceptopBasicAuthService', () => {
  let service: HttpInterceptopBasicAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterceptopBasicAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
