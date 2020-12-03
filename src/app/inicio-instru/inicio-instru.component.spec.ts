import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioInstruComponent } from './inicio-instru.component';

describe('InicioInstruComponent', () => {
  let component: InicioInstruComponent;
  let fixture: ComponentFixture<InicioInstruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioInstruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioInstruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
