import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChangeSecurityGComponent } from './register-change-security-g.component';

describe('RegisterChangeSecurityGComponent', () => {
  let component: RegisterChangeSecurityGComponent;
  let fixture: ComponentFixture<RegisterChangeSecurityGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterChangeSecurityGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterChangeSecurityGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
