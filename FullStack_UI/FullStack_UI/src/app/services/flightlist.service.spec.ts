import { TestBed } from '@angular/core/testing';

import FlightlistService from './flightlist.service';

describe('FlightlistService', () => {
  let service: FlightlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
