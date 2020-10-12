import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  api = " https://testshopiy.herokuapp.com";
  bannersImages = new BehaviorSubject(null)
  constructor(private httpClient: HttpClient) { }
  getBanners(): Observable<any> {
    return this.httpClient.get(this.api+"/getSlider").pipe(
      tap(res=>{
        this.bannersImages.next(res);
      })
    )
  }
}
