import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AgGridModule } from 'ag-grid-angular/main';
import { SportsTimerComponent } from './component/sports-timer/sports-timer.component';

import { SocketConnectService } from './services/socket-connect.service'

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SportsTimerComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AgGridModule.withComponents([])
  ],
  providers: [
    SocketConnectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
