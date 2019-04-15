import { TestBed } from '@angular/core/testing';

import { SocketConnectService } from './socket-connect.service';
import { HttpClientModule } from '@angular/common/http'; 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


describe('SocketConnectService', () => {
  const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [        
      HttpClientModule,
      SocketIoModule.forRoot(config)
    ]
  }));

  it('should be created', () => {
    const service: SocketConnectService = TestBed.get(SocketConnectService);
    expect(service).toBeTruthy();
  });
});
