import { TestBed, inject } from '@angular/core/testing';

import { MessagingRTDBService } from './messaging-rtdb.service';

describe('MessagingRTDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagingRTDBService]
    });
  });

  it('should be created', inject([MessagingRTDBService], (service: MessagingRTDBService) => {
    expect(service).toBeTruthy();
  }));
});
