import { TestBed } from '@angular/core/testing';

import { Api } from './api.service';

describe('ApiService', () => {
  let service: Api;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
