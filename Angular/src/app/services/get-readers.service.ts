import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GetReadersService {

  constructor(private httpClient: HttpClient) { }

  getReadersDetails(){
      return this.httpClient.get('http://localhost:5000/readers');
  }
}
