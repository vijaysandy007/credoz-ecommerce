import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProddetialsComponent } from './proddetials.component';

describe('ProddetialsComponent', () => {
  let component: ProddetialsComponent;
  let fixture: ComponentFixture<ProddetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProddetialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProddetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
