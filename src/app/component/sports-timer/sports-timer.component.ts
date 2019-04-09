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
  public finishedData = new Set();
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
     if(data[0].reader_id === 21) {
      let startObj = {};
      startObj["athlName"] = data[0]["athlete"]["name"];
      startObj["athlNum"] = data[0]["athlete"]["number"];
      startObj["finishStartTime"] = this.calculateTime(new Date(data[0]["timestamp"]));
      //obj["finishEndTime"] = data[0]["timestamp"];

      //this.statusData.push(startObj);
      this.statusData.unshift(startObj);
     } else if(data[0].reader_id === 22) {
      let athleteNum= data[0]["athlete"]["number"];

      let currIndex;
      this.statusData.forEach((athlete, index) => {
        if(athlete.athlNum === athleteNum){
          currIndex = index;
          athlete["position"] = this.athlPos++;  
          athlete["finishEndTime"] = this.calculateTime(new Date(data[0]["timestamp"]));
        }
      })

      if(typeof currIndex !== 'undefined'){
        let selectedItem = this.statusData.splice(currIndex,1);
        this.bSubject.next(selectedItem);
  
        this.bSubject.subscribe(data => {
          let finishObj = data[0];
          console.log(data);
          if(data.length === 0) return;
          //finishObj["finishEndTime"] = this.calculateTime(new Date(data[0]["timestamp"]));
          this.finishedData.add(finishObj);
        });
      }

      //this.finishedData.push(selectedItem[0]);
     }
    });

  }
  
  calculateTime(dateval) {
    let hour =  ("0" + dateval.getHours()).slice(-2); 
    let minute = ("0" + dateval.getMinutes()).slice(-2); 
    let second = ("0" + dateval.getSeconds()).slice(-2); 
    let millisec = ("00" + dateval.getMilliseconds()).slice(-3); 

    return hour + ':' + minute + ':' + second + ':' + millisec;
  }

}
