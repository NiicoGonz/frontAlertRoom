import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultRoomInstruComponent } from './consult-room-instru.component';

describe('ConsultRoomInstruComponent', () => {
  let component: ConsultRoomInstruComponent;
  let fixture: ComponentFixture<ConsultRoomInstruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultRoomInstruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultRoomInstruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
