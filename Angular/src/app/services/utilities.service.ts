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
    let hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document["msHidden"] !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document["webkitHidden"] !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }
    return { hidden: hidden, visibilityChange: visibilityChange }
  }
}
