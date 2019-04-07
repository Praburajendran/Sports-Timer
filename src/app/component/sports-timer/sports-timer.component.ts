import { Component, OnInit } from '@angular/core';
import { Observable, Observer, BehaviorSubject, Subject, throwError} from 'rxjs';
import * as Rx from "rxjs";

import { SocketConnectService } from '../../services/socket-connect.service';


@Component({
  selector: 'app-sports-timer',
  templateUrl: './sports-timer.component.html',
  styleUrls: ['./sports-timer.component.css']
})
export class SportsTimerComponent implements OnInit {

  constructor(private socksrvc: SocketConnectService) { }

  public title = 'sport-timer';
  public statusData = [];
  public finishedData = [];
  public bSubject;
  public athlPos = 1;

  public columnDefs = [
      {headerName: 'Athlete Name', field: 'athlName' },
      {headerName: 'Athlete Number', field: 'athlNum' },
      {headerName: 'Finish Start Time', field: 'finishStartTime' },
      {headerName: 'Finish End Time', field: 'finishEndTime' }
  ];

  ngOnInit() {
    this.getCaptureData();
  }

  getCaptureData(){

    this.bSubject = new BehaviorSubject([]); 

    this.socksrvc.getCaptures().subscribe(data => {
      console.log(data);
     // this.bSubject.next(data);

     if(data["length"] !== 1 ) return;
     if(data[0].reader_id === 15) {
      let startObj = {};
      startObj["athlName"] = data[0]["athlete"]["name"];
      startObj["athlNum"] = data[0]["athlete"]["number"];
      startObj["finishStartTime"] = new Date(data[0]["timestamp"]).toString();
      //obj["finishEndTime"] = data[0]["timestamp"];

      //this.statusData.push(startObj);
      this.statusData.unshift(startObj);
     } else if(data[0].reader_id === 16) {
      let athleteNum= data[0]["athlete"]["number"];

      let currIndex;
      this.statusData.forEach((athlete, index) => {
        if(athlete.athlNum === athleteNum){
          currIndex = index;
          athlete["finishEndTime"] = new Date(data[0]["timestamp"]).toString();
          athlete["position"] = this.athlPos++;
        }
      })
      let selectedItem = this.statusData.splice(currIndex,1);
      this.finishedData.push(selectedItem[0]);
     }
    });

    // this.bSubject.subscribe(data => {
    //   console.log(data);
    //   if(data.length === 0) return;
    //   let obj = {};
    //   obj["athlName"] = data[0]["athlete"]["name"];
    //   obj["athlNum"] = data[0]["athlete"]["number"];
    //   obj["finishStartTime"] = data[0]["captured"];
    //   obj["finishEndTime"] = data[0]["timestamp"];

    //   this.statusData.push(obj);
    // });
  }
}
