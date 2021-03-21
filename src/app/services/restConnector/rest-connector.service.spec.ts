import { TestBed } from '@angular/core/testing';

import { RestConnectorService } from './rest-connector.service';

describe('RestConnectorService', () => {
  let service: RestConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
