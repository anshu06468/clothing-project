import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductService } from "./../services/product.service"
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private productService:ProductService){}

  private singleProduct={};
  private productChanged = new BehaviorSubject({})

  setProduct(product){
    this.singleProduct=product;
    this.productChanged.next(product)
    // console.log(product)
  }

  getProduct(){
    this.productChanged.subscribe(data=>{
      console.log(data)
    })
    return this.singleProduct;
  }

  emptyProduct(){
    this.singleProduct = {}
  }


}
