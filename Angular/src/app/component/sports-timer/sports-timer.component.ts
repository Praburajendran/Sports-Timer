import { Component, OnInit } from '@angular/core';
import { Observable, Observer, BehaviorSubject, Subject, throwError} from 'rxjs';
import { first } from 'rxjs/operators';

import { SocketConnectService } from '../../services/socket-connect.service';
import { GetReadersService } from '../../services/get-readers.service';
import { UtilitiesService } from '../../services/utilities.service';


@Component({
  selector: 'app-sports-timer',
  templateUrl: './sports-timer.component.html',
  styleUrls: ['./sports-timer.component.css']
})
export class SportsTimerComponent implements OnInit {

  constructor(private socksrvc: SocketConnectService, private readsrvc: GetReadersService, private utilsrvc: UtilitiesService) { }

  public title = 'Sports-Timer';
  public statusData = [];
  public athlCompleted = [];
  public finishedData = new Set();
  public bSubject;
  public athlPos = 1;
  public readers;
  public getCapSrvc;
  public hidden;
  public visibilityChange;


  ngOnInit() {
    this.readsrvc.getReadersDetails().pipe(first()).subscribe(readerresp => {
      this.readers = readerresp;
      this.getCaptureData();
      let visibObj = this.utilsrvc.addVisibility();
      this.hidden = visibObj.hidden;

      if (typeof document.addEventListener === "undefined" || this.hidden === undefined) {
          console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
      } else {
          // Handle page visibility change   
          document.addEventListener(visibObj.visibilityChange, this.handleVisibilityChange, false);
      }
    });
  }

  handleVisibilityChange = () =>{
   console.log( ' i  am herereeeeeeee')
    if (document[this.hidden]) {
      console.log(' i am in unsubscibe method')
        this.getCapSrvc.unsubscribe();
    } else {
      this.getCaptureData();
    }
  }
  
  getCaptureData(){
    this.bSubject = new BehaviorSubject([]); 
    this.getCapSrvc = this.socksrvc.getCaptures().subscribe(data => {

     if(data["length"] !== 1 ) return;
     if(data[0].reader_id === this.readers[0].id) {
      let athlName = data[0]["athlete"]["name"];
      let athlNum = data[0]["athlete"]["number"];
      if(this.athlCompleted.indexOf(athlNum) === -1){
        let startObj = {};
        startObj["athlName"] = athlName;
        startObj["athlNum"] = athlNum;
        startObj["finishStartTime"] = this.utilsrvc.calculateTime(new Date(data[0]["timestamp"]));
        //obj["finishEndTime"] = data[0]["timestamp"];
  
        //this.statusData.push(startObj);
        this.statusData.unshift(startObj);
      } else {
        //console.log( data[0]["athlete"]["name"])
      }
     } else if(data[0].reader_id === this.readers[1].id) {
      let athleteNum= data[0]["athlete"]["number"];

      this.athlCompleted.push(athleteNum);

      let currIndex;
      this.statusData.forEach((athlete, index) => {
        if(athlete.athlNum === athleteNum){
          currIndex = index;
          athlete["position"] = this.athlPos++;  
          athlete["finishEndTime"] = this.utilsrvc.calculateTime(new Date(data[0]["timestamp"]));
        }
      })

      if(typeof currIndex !== 'undefined'){
        let selectedItem = this.statusData.splice(currIndex,1);
        this.bSubject.next(selectedItem);
  
        this.bSubject.subscribe(data => {
          let finishObj = data[0];
          //console.log(data);
          if(data.length === 0) return;
          //finishObj["finishEndTime"] = this.calculateTime(new Date(data[0]["timestamp"]));
          this.finishedData.add(finishObj);
        });
      }

      //this.finishedData.push(selectedItem[0]);
     }
    });
  }
}
