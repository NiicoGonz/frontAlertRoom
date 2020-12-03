import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRoomAdminComponent } from './register-room-admin.component';

describe('RegisterRoomAdminComponent', () => {
  let component: RegisterRoomAdminComponent;
  let fixture: ComponentFixture<RegisterRoomAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRoomAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRoomAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
