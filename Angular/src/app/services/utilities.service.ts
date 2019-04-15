import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

    
  calculateTime(dateval) {
    let hour =  ("0" + dateval.getHours()).slice(-2); 
    let minute = ("0" + dateval.getMinutes()).slice(-2); 
    let second = ("0" + dateval.getSeconds()).slice(-2); 
    let millisec = ("00" + dateval.getMilliseconds()).slice(-3); 

    return hour + ':' + minute + ':' + second + ':' + millisec;
  }

  addVisibility() {
    let visibilityObj;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
      visibilityObj["hidden"] = "hidden";
      visibilityObj["visibilityChange"] = "visibilitychange";
    } else if (typeof document["msHidden"] !== "undefined") {
      visibilityObj["hidden"] = "msHidden";
      visibilityObj["visibilityChange"] = "msvisibilitychange";
    } else if (typeof document["webkitHidden"] !== "undefined") {
      visibilityObj["hidden"] = "webkitHidden";
      visibilityObj["visibilityChange"] = "webkitvisibilitychange";
    }
    return visibilityObj;
  }
}
