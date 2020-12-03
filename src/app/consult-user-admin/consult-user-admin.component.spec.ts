import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultUserAdminComponent } from './consult-user-admin.component';

describe('ConsultUserAdminComponent', () => {
  let component: ConsultUserAdminComponent;
  let fixture: ComponentFixture<ConsultUserAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultUserAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
