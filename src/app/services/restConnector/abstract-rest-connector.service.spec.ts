import { TestBed } from '@angular/core/testing';

import { AbstractRestConnectorService } from './abstract-rest-connector.service';

describe('AbstractRestConnectorService', () => {
  let service: AbstractRestConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractRestConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
