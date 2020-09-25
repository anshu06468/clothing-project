import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<{}> {
  constructor(private productS:ProductsService,private productser:ProductService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){  
    const product=this.productS.getProduct()
    if(Object.keys(product).length === 0){
      return this.productser.getProductById(route.paramMap.get('id'));
    }else{
      return product;
    }
  }
}

