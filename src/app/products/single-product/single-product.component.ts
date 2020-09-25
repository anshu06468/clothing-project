import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  @ViewChild("smlb") smallBox :ElementRef
  @ViewChild("pht") photo :ElementRef
  
  product;
  
  constructor(private productList:ProductsService) {
   }
  myThumbnail;
  ngOnInit(): void {

    this.product = this.productList.getProduct()
    // this.OnSelect(0)
    // console.log(this.productList.getProduct());
  }

  OnSelect(index){
    const children = this.photo.nativeElement.children;
    for(var i = 0;i<children.length;i++){
      if(i==index){
        children[i].style.border="1px solid"
      }
      else{
        children[i].style.border="none"
      }

    }
  }
}
