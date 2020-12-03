import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultRoomAdminComponent } from './consult-room-admin.component';

describe('ConsultRoomAdminComponent', () => {
  let component: ConsultRoomAdminComponent;
  let fixture: ComponentFixture<ConsultRoomAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultRoomAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultRoomAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
