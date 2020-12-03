import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultInfoRoomSecurityGComponent } from './consult-info-room-security-g.component';

describe('ConsultInfoRoomSecurityGComponent', () => {
  let component: ConsultInfoRoomSecurityGComponent;
  let fixture: ComponentFixture<ConsultInfoRoomSecurityGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultInfoRoomSecurityGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultInfoRoomSecurityGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
