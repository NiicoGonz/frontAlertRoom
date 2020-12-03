import { TestBed } from '@angular/core/testing';

import { InstruGuard } from './instru.guard';

describe('InstruGuard', () => {
  let guard: InstruGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InstruGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
