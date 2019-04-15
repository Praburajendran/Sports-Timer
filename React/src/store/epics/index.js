import { combineEpics , ofType } from 'redux-observable';
import * as Rx from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { mergeMap, flatMap} from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import {
    CAPTURE_DATA, CAPTURE_DATA_SUCCESS, storeSockData
} from "../actions";

import socketIOClient from "socket.io-client";

export const rootEpic = combineEpics(fetchCaptureData);

const socket = socketIOClient("http://localhost:5000/");

const socketVal = fromEvent(socket, 'capture');


const socketIdStream = Rx.Observable.create(observer => {
    socket.on('capture', data => { observer.onNext(data); });
});  

function fetchCaptureData(action$) {
    return action$.pipe(
    ofType('CAPTURE_DATA'),
    mergeMap(() =>
        socketVal.pipe(map(payload => ({
          type: 'CAPTURE_DATA_SUCCESS',
          payload
        })))
    ))
}