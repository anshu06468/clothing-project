import { Injectable } from '@angular/core';
import { timeout, delay } from 'q';
import { Observable, of } from 'rxjs';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = "https://testshopiy.herokuapp.com";
  constructor(private loadingService: LoadingService, private httpClient: HttpClient) { }


  getAllProducts(): Observable<any> {
    return this.httpClient.get(this.api+"/getCategory");
    
  }

  getSimillarProducts(): Observable<any> {
    return this.httpClient.get(this.api+"/getProduct");
  }

  getSingleProduct(id:number): Observable<any> {
    return this.httpClient.get(this.api+"/getProducts/"+id);
  }

  getCategoryProducts(category: string): Observable<any> {
    // console.log(this.api+"/getProduct?category="+encodeURI(category))
    return this.httpClient.get(this.api+"/getProduct?category="+encodeURI(category));
  }
}
