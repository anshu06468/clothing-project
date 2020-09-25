import { Injectable, Injector } from '@angular/core';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = "https://testshopiy.herokuapp.com";
  constructor(private httpClient: HttpClient,private injector:Injector) { }


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

  getProductById(id){
    return this.httpClient.get(this.api+"/getProductByID/"+id).pipe(
      tap(data=>{
        console.log(data)
        const prod = this.injector.get(ProductsService)
        prod.setProduct(data);
      })
    );
  }
}
