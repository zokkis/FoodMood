import { TestBed } from '@angular/core/testing';

import { InfoControllerService } from './info-controller.service';

describe('InfoControllerService', () => {
  let service: InfoControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
