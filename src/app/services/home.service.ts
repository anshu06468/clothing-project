import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  api = " https://testshopiy.herokuapp.com";
  constructor(private httpClient: HttpClient) { }
  getBanners(): Observable<any> {
    return this.httpClient.get(this.api+"/getSlider");
    
  }
}
