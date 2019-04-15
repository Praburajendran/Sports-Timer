import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SportsTimerComponent } from './component/sports-timer/sports-timer.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
  const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SportsTimerComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        SocketIoModule.forRoot(config)
      ],
    }).compileComponents();
  }));
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it(`should have as title 'Sports-Timer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Sports-Timer');
  });
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Sports-Timer!');
  });
});
