import { TestBed, inject } from '@angular/core/testing';

import { PricingDatabaseService } from './pricing-database.service';

describe('PricingDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricingDatabaseService]
    });
  });

  it('should be created', inject([PricingDatabaseService], (service: PricingDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
