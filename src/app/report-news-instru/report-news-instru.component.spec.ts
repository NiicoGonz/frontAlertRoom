import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNewsInstruComponent } from './report-news-instru.component';

describe('ReportNewsInstruComponent', () => {
  let component: ReportNewsInstruComponent;
  let fixture: ComponentFixture<ReportNewsInstruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportNewsInstruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNewsInstruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
