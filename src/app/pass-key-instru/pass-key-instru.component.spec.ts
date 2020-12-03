import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassKeyInstruComponent } from './pass-key-instru.component';

describe('PassKeyInstruComponent', () => {
  let component: PassKeyInstruComponent;
  let fixture: ComponentFixture<PassKeyInstruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassKeyInstruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassKeyInstruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
