import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsTimerComponent } from './sports-timer.component';

describe('SportsTimerComponent', () => {
  let component: SportsTimerComponent;
  let fixture: ComponentFixture<SportsTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
