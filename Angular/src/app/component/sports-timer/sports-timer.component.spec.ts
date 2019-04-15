import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsTimerComponent } from './sports-timer.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http'; 

describe('SportsTimerComponent', () => {
  let component: SportsTimerComponent; 
  let fixture: ComponentFixture<SportsTimerComponent>;
  const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsTimerComponent ],
      imports: [        
        HttpClientModule,
        SocketIoModule.forRoot(config)
      ]
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
