import { TestBed } from '@angular/core/testing';

import { AdmingaurdGuard } from './admingaurd.guard';

describe('AdmingaurdGuard', () => {
  let guard: AdmingaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdmingaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
