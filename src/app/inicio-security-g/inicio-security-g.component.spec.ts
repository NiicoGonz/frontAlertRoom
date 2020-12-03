import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSecurityGComponent } from './inicio-security-g.component';

describe('InicioSecurityGComponent', () => {
  let component: InicioSecurityGComponent;
  let fixture: ComponentFixture<InicioSecurityGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioSecurityGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSecurityGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
