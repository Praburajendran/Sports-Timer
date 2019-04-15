import openSocket from "socket.io-client";
import { Observable } from 'rxjs';


const socket = openSocket("http://localhost:5000/");

function connect(cb) {
  socket.on("captures", data => {
    let resultobs = Observable.create(function(observer) {
      observer.next(data[0]);
    });
    return resultobs;
  });
}

export { connect };