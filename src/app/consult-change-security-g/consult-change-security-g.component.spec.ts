import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultChangeSecurityGComponent } from './consult-change-security-g.component';

describe('ConsultChangeSecurityGComponent', () => {
  let component: ConsultChangeSecurityGComponent;
  let fixture: ComponentFixture<ConsultChangeSecurityGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultChangeSecurityGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultChangeSecurityGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
