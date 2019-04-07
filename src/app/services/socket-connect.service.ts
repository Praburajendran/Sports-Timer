import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketConnectService {

  constructor(private socket: Socket) { }
  
  getReaders() {
    return this.socket.fromEvent("readers");
  }

  getCaptures() {
    return this.socket.fromEvent("captures");
  }

}
